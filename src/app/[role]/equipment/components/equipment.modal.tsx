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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import {
  formatEquipmentCategory,
  formatEquipmentState,
} from "@/features/equipment/display";
import {
  EQUIPMENT_CREATE,
  EQUIPMENT_UPDATE,
} from "@/features/equipment/graphql/mutations.gql";
import type { Equipment, Hospital } from "@/generated/graphql";
import { EquipmentCategory, EquipmentState } from "@/generated/graphql";

type EquipmentForm = {
  name: string;
  serialNo: string;
  brand: string;
  model: string;
  manufacturedYear: string;
  commissionedDate: string;
  endOfLifeDate: string;
  passportDocument: string;
  usageManualDocument: string;
  calibrationInstructionDocument: string;
  maintenancePlan: string;
  requiredParts: string;
  usedParts: string;
  sparePartsStock: string;
  category: EquipmentCategory | "";
  state: EquipmentState | "";
  hospitalId: string;
};

type EquipmentModalProps = {
  open: boolean;
  mode: "create" | "update";
  initialData?: Equipment | null;
  hospitals: Hospital[];
  onClose: () => void;
  onSuccess: () => void;
};

const schema = z.object({
  name: z.string().min(1, "Нэр оруулна уу"),
  serialNo: z.string().min(1, "Сериал дугаар оруулна уу"),
  category: z.string().min(1, "Ангилал сонгоно уу"),
  state: z.string().min(1, "Төлөв сонгоно уу"),
  hospitalId: z.string().min(1, "Эмнэлэг сонгоно уу"),
  manufacturedYear: z
    .string()
    .refine(
      (value) =>
        !value ||
        (/^\d{4}$/.test(value) &&
          Number(value) >= 1900 &&
          Number(value) <= 2100),
      "Зөв он оруулна уу",
    ),
});

const emptyForm: EquipmentForm = {
  name: "",
  serialNo: "",
  brand: "",
  model: "",
  manufacturedYear: "",
  commissionedDate: "",
  endOfLifeDate: "",
  passportDocument: "",
  usageManualDocument: "",
  calibrationInstructionDocument: "",
  maintenancePlan: "",
  requiredParts: "",
  usedParts: "",
  sparePartsStock: "",
  category: "",
  state: "",
  hospitalId: "",
};

const formatDateInput = (value?: unknown) => {
  if (!value) return "";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const optionalString = (value: string) => {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
};

const optionalDate = (value: string) => (value ? new Date(value) : null);

export default function EquipmentModal({
  open,
  mode,
  initialData,
  hospitals,
  onClose,
  onSuccess,
}: EquipmentModalProps) {
  const [form, setForm] = useState<EquipmentForm>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [createEquipment, createState] = useMutation(EQUIPMENT_CREATE);
  const [updateEquipment, updateState] = useMutation(EQUIPMENT_UPDATE);

  const loading = createState.loading || updateState.loading;
  const error = createState.error || updateState.error;

  useEffect(() => {
    if (!open) return;
    if (mode === "update" && initialData) {
      setForm({
        name: initialData.name ?? "",
        serialNo: initialData.serialNo ?? "",
        brand: initialData.brand ?? "",
        model: initialData.model ?? "",
        manufacturedYear: initialData.manufacturedYear
          ? String(initialData.manufacturedYear)
          : "",
        commissionedDate: formatDateInput(initialData.commissionedDate),
        endOfLifeDate: formatDateInput(initialData.endOfLifeDate),
        passportDocument: initialData.passportDocument ?? "",
        usageManualDocument: initialData.usageManualDocument ?? "",
        calibrationInstructionDocument:
          initialData.calibrationInstructionDocument ?? "",
        maintenancePlan: initialData.maintenancePlan ?? "",
        requiredParts: initialData.requiredParts ?? "",
        usedParts: initialData.usedParts ?? "",
        sparePartsStock: initialData.sparePartsStock ?? "",
        category: (initialData.category ?? "") as EquipmentCategory | "",
        state: (initialData.state ?? "") as EquipmentState | "",
        hospitalId: initialData.hospital?.id ?? "",
      });
    } else {
      setForm((prev) => ({
        ...emptyForm,
        hospitalId: hospitals[0]?.id ?? prev.hospitalId ?? "",
      }));
    }
    setErrors({});
  }, [open, mode, initialData, hospitals]);

  const title = useMemo(
    () =>
      mode === "create" ? "Тоног төхөөрөмж нэмэх" : "Тоног төхөөрөмж засах",
    [mode],
  );

  const submitLabel = mode === "create" ? "Үүсгэх" : "Шинэчлэх";

  const validate = () => {
    const result = schema.safeParse(form);
    if (result.success) {
      setErrors({});
      return true;
    }
    const nextErrors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const key = issue.path[0] as string | undefined;
      if (key) nextErrors[key] = issue.message;
    });
    setErrors(nextErrors);
    return false;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const input = {
      name: form.name,
      serialNo: form.serialNo,
      brand: optionalString(form.brand),
      model: optionalString(form.model),
      manufacturedYear: form.manufacturedYear
        ? Number(form.manufacturedYear)
        : null,
      commissionedDate: optionalDate(form.commissionedDate),
      endOfLifeDate: optionalDate(form.endOfLifeDate),
      passportDocument: optionalString(form.passportDocument),
      usageManualDocument: optionalString(form.usageManualDocument),
      calibrationInstructionDocument: optionalString(
        form.calibrationInstructionDocument,
      ),
      maintenancePlan: optionalString(form.maintenancePlan),
      requiredParts: optionalString(form.requiredParts),
      usedParts: optionalString(form.usedParts),
      sparePartsStock: optionalString(form.sparePartsStock),
      category: form.category as EquipmentCategory,
      state: form.state as EquipmentState,
      hospitalId: form.hospitalId,
    };

    if (mode === "create") {
      await createEquipment({ variables: { input } });
    } else if (initialData?.id) {
      await updateEquipment({
        variables: { equipmentUpdateId: initialData.id, input },
      });
    }

    onSuccess();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}

        <Stack spacing={3}>
          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight={800}>
              Үндсэн мэдээлэл
            </Typography>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                label="Нэр"
                fullWidth
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                label="Сериал дугаар"
                fullWidth
                value={form.serialNo}
                onChange={(e) => setForm({ ...form, serialNo: e.target.value })}
                error={!!errors.serialNo}
                helperText={errors.serialNo}
              />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                label="Брэнд"
                fullWidth
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
              />
              <TextField
                label="Модель"
                fullWidth
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
              />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                label="Үйлдвэрлэсэн он"
                fullWidth
                value={form.manufacturedYear}
                onChange={(e) =>
                  setForm({ ...form, manufacturedYear: e.target.value })
                }
                error={!!errors.manufacturedYear}
                helperText={errors.manufacturedYear}
              />
              <TextField
                label="Ашиглалтад орсон огноо"
                type="date"
                fullWidth
                value={form.commissionedDate}
                onChange={(e) =>
                  setForm({ ...form, commissionedDate: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Ашиглалтын дуусах огноо"
                type="date"
                fullWidth
                value={form.endOfLifeDate}
                onChange={(e) =>
                  setForm({ ...form, endOfLifeDate: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                select
                label="Ангилал"
                fullWidth
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as EquipmentCategory,
                  })
                }
                error={!!errors.category}
                helperText={errors.category}
              >
                {Object.values(EquipmentCategory).map((value) => (
                  <MenuItem key={value} value={value}>
                    {formatEquipmentCategory(value)}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Төлөв"
                fullWidth
                value={form.state}
                onChange={(e) =>
                  setForm({ ...form, state: e.target.value as EquipmentState })
                }
                error={!!errors.state}
                helperText={errors.state}
              >
                {Object.values(EquipmentState).map((value) => (
                  <MenuItem key={value} value={value}>
                    {formatEquipmentState(value)}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Эмнэлэг"
                fullWidth
                value={form.hospitalId}
                onChange={(e) =>
                  setForm({ ...form, hospitalId: e.target.value })
                }
                error={!!errors.hospitalId}
                helperText={errors.hospitalId}
              >
                {hospitals.map((hospital) => (
                  <MenuItem key={hospital.id} value={hospital.id ?? ""}>
                    {hospital.name ?? hospital.id}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Stack>

          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight={800}>
              Баримт бичиг
            </Typography>
            <TextField
              label="Паспорт"
              fullWidth
              value={form.passportDocument}
              onChange={(e) =>
                setForm({ ...form, passportDocument: e.target.value })
              }
            />
            <TextField
              label="Ашиглалтын заавар"
              fullWidth
              value={form.usageManualDocument}
              onChange={(e) =>
                setForm({ ...form, usageManualDocument: e.target.value })
              }
            />
            <TextField
              label="Тохируулга / калибровкын заавар"
              fullWidth
              value={form.calibrationInstructionDocument}
              onChange={(e) =>
                setForm({
                  ...form,
                  calibrationInstructionDocument: e.target.value,
                })
              }
            />
          </Stack>

          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight={800}>
              Засвар үйлчилгээ ба сэлбэг
            </Typography>
            <TextField
              label="Засвар үйлчилгээний төлөвлөгөө"
              fullWidth
              multiline
              minRows={3}
              value={form.maintenancePlan}
              onChange={(e) =>
                setForm({ ...form, maintenancePlan: e.target.value })
              }
            />
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                label="Шаардлагатай сэлбэг"
                fullWidth
                multiline
                minRows={2}
                value={form.requiredParts}
                onChange={(e) =>
                  setForm({ ...form, requiredParts: e.target.value })
                }
              />
              <TextField
                label="Ашигласан сэлбэг"
                fullWidth
                multiline
                minRows={2}
                value={form.usedParts}
                onChange={(e) =>
                  setForm({ ...form, usedParts: e.target.value })
                }
              />
              <TextField
                label="Үлдэгдэл / бэлэн байдал"
                fullWidth
                multiline
                minRows={2}
                value={form.sparePartsStock}
                onChange={(e) =>
                  setForm({ ...form, sparePartsStock: e.target.value })
                }
              />
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Болих
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
