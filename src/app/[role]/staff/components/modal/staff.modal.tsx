"use client";
import { useMutation } from "@apollo/client/react";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import {
  MEMBERSHIP_UPDATE,
  USER_CREATE,
  USER_UPDATE,
} from "@/features/staff/graphql/mutations.gql";
import type { Membership } from "@/generated/graphql";
import { OrganizationRole } from "@/generated/graphql";

interface StaffModalProps {
  open: boolean;
  mode: "create" | "update";
  initialData?: Membership | null;
  onClose: () => void;
  onSuccess: () => void;
  activeOrgId: string | null;
}

const ROLES = [
  { value: OrganizationRole.Owner, label: "Эзэмшигч" },
  { value: OrganizationRole.Manager, label: "Менежер" },
  { value: OrganizationRole.Staff, label: "Ажилтан" },
];

type StaffForm = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: OrganizationRole | "";
};

const baseSchema = z.object({
  name: z.string().min(1, "Нэр шаардлагатай"),
  email: z.string().email("Имэйл буруу байна"),
  phone: z.string().min(1, "Утас шаардлагатай"),
  password: z.string().optional(),
  role: z.string().min(1, "Үүрэг сонгоно уу"),
});

const emptyForm: StaffForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "",
};

export default function StaffModal({
  open,
  mode,
  initialData,
  onClose,
  onSuccess,
  activeOrgId,
}: StaffModalProps) {
  const [form, setForm] = useState<StaffForm>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [createUser, createState] = useMutation(USER_CREATE);
  const [updateUser, updateState] = useMutation(USER_UPDATE);
  const [updateMembership, membershipState] = useMutation(MEMBERSHIP_UPDATE);

  const loading =
    createState.loading || updateState.loading || membershipState.loading;
  const error = createState.error || updateState.error || membershipState.error;

  useEffect(() => {
    if (!open) return;
    if (mode === "update" && initialData) {
      setForm({
        name: initialData.user?.name ?? "",
        email: initialData.user?.email ?? "",
        phone: initialData.user?.phone ?? "",
        password: "",
        role: initialData.role ?? "",
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [open, mode, initialData]);

  const title = useMemo(
    () => (mode === "create" ? "Шинэ ажилтан нэмэх" : "Ажилтан засах"),
    [mode],
  );

  const submitLabel = mode === "create" ? "Үүсгэх" : "Шинэчлэх";

  const validate = () => {
    const result = baseSchema.safeParse(form);
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string | undefined;
        if (key) nextErrors[key] = issue.message;
      });
      setErrors(nextErrors);
      return false;
    }
    if (mode === "create" && !form.password) {
      setErrors({ password: "Нууц үг шаардлагатай" });
      return false;
    }
    if (!activeOrgId) {
      setErrors({ organizationId: "Байгууллага сонгоно уу" });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (mode === "create") {
      await createUser({
        variables: {
          input: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password,
            role: form.role as OrganizationRole,
            organizationId: activeOrgId,
          },
        },
      });
      onSuccess();
      return;
    }

    if (!initialData?.user?.id) return;

    await updateUser({
      variables: {
        userUpdateId: initialData.user.id,
        input: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          ...(form.password ? { password: form.password } : {}),
        },
      },
    });

    if (initialData.id && form.role && form.role !== initialData.role) {
      await updateMembership({
        variables: {
          membershipUpdateId: initialData.id,
          input: { role: form.role as OrganizationRole },
        },
      });
    }

    onSuccess();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}

        <TextField
          label="Нэр"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          label="Имэйл"
          fullWidth
          margin="normal"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Утас"
          fullWidth
          margin="normal"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          error={!!errors.phone}
          helperText={errors.phone}
        />

        <TextField
          label="Нууц үг"
          fullWidth
          margin="normal"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={!!errors.password}
          helperText={
            mode === "update" && !errors.password
              ? "Хэрэв өөрчлөх бол бөглөнө үү"
              : errors.password
          }
        />

        <TextField
          select
          label="Үүрэг"
          fullWidth
          margin="normal"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value as OrganizationRole })
          }
          error={!!errors.role}
          helperText={errors.role}
        >
          {ROLES.map((role) => (
            <MenuItem key={role.value} value={role.value}>
              {role.label}
            </MenuItem>
          ))}
        </TextField>
        {!activeOrgId && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Үргэлжлүүлэхийн өмнө байгууллага сонгоно уу.
          </Alert>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Болих
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !activeOrgId}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
