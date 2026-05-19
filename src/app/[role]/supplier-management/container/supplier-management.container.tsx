"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

import AbilityGuard from "@/components/AbilityGuard";
import ConfirmDialog from "@/components/core/ConfirmDialog";
import StateView from "@/components/core/StateView";
import Toast from "@/components/core/Toast";
import PageToolbar from "@/components/forms/toolbar";
import {
  SUPPLIER_STATUSES,
  supplierStatusLabelMap,
} from "@/features/supply/constants";
import {
  SUPPLIER_CREATE,
  SUPPLIER_DELETE,
  SUPPLIER_UPDATE,
} from "@/features/supply/graphql/mutations.gql";
import {
  SuppliersDocument,
  type SuppliersQuery,
  type SuppliersQueryVariables,
} from "@/features/supply/graphql/queries.gql";
import { useActiveOrganization } from "@/hooks/useActiveOrganization";
import { getPortalRole, getSupplierManagementSubject } from "@/lib/casl";
import {
  formatAddress,
  formatDateTime,
  formatNullable,
} from "@/utils/detailFormatters";

type SupplierFormState = {
  name: string;
  description: string;
  logoUrl: string;
  email: string;
  phone: string;
  website: string;
  status: string;
  address1: string;
  address2: string;
  province: string;
  ownerUserId: string;
};

const emptyForm: SupplierFormState = {
  name: "",
  description: "",
  logoUrl: "",
  email: "",
  phone: "",
  website: "",
  status: "ACTIVE",
  address1: "",
  address2: "",
  province: "",
  ownerUserId: "",
};

const resolveRolePrefix = (
  portalRole: string | null,
  isPlatformAdmin?: boolean,
) => {
  if (isPlatformAdmin || portalRole === "ADMIN") return "admin";
  if (portalRole?.startsWith("SUPPLIER_")) return "supplier";
  if (portalRole?.startsWith("HOSPITAL_")) return "hospital";
  if (portalRole?.startsWith("PHARMACY_")) return "pharmacy";
  return "user";
};

export default function SupplierManagementContainer() {
  const router = useRouter();
  const subject = getSupplierManagementSubject();
  const { data: session } = useSession();
  const { activeOrganization } = useActiveOrganization();
  const portalRole = getPortalRole(
    session?.user ?? null,
    activeOrganization ?? null,
  );
  const rolePrefix = resolveRolePrefix(
    portalRole,
    session?.user?.isPlatformAdmin,
  );

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<SupplierFormState>(emptyForm);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const handler = debounce(() => setDebouncedSearch(search), 350);
    handler();
    return () => handler.cancel();
  }, [search]);

  const suppliersQuery = useQuery<SuppliersQuery, SuppliersQueryVariables>(
    SuppliersDocument,
    {
      variables: {
        take: 100,
        skip: 0,
        where: {
          search: debouncedSearch || undefined,
        },
      },
      fetchPolicy: "no-cache",
    },
  );

  const [createSupplier, createState] = useMutation(SUPPLIER_CREATE);
  const [updateSupplier, updateState] = useMutation(SUPPLIER_UPDATE);
  const [deleteSupplier, deleteState] = useMutation(SUPPLIER_DELETE, {
    onCompleted: async () => {
      setDeleteId(null);
      setToast({
        message: "Нийлүүлэгчийг амжилттай устгалаа.",
        severity: "success",
      });
      await suppliersQuery.refetch();
    },
    onError: (error) => {
      setToast({ message: error.message, severity: "error" });
    },
  });

  const canCreate = portalRole === "ADMIN";
  const canUpdate =
    portalRole === "ADMIN" ||
    portalRole === "SUPPLIER_OWNER" ||
    portalRole === "SUPPLIER_MANAGER";
  const canDelete = portalRole === "ADMIN";

  const suppliers = suppliersQuery.data?.suppliers?.data ?? [];
  const editingSupplier = useMemo(
    () => suppliers.find((supplier) => supplier.id === editingId) ?? null,
    [editingId, suppliers],
  );

  useEffect(() => {
    if (!open) return;
    if (editingSupplier) {
      setForm({
        name: editingSupplier.name,
        description: editingSupplier.description ?? "",
        logoUrl: editingSupplier.logoUrl ?? "",
        email: editingSupplier.email ?? "",
        phone: editingSupplier.phone ?? "",
        website: editingSupplier.website ?? "",
        status: editingSupplier.status,
        address1: editingSupplier.address?.address1 ?? "",
        address2: editingSupplier.address?.address2 ?? "",
        province: editingSupplier.address?.province ?? "",
        ownerUserId: "",
      });
    } else {
      setForm(emptyForm);
    }
    setErrorMessage(null);
  }, [editingSupplier, open]);

  const submitForm = async () => {
    if (!form.name.trim()) {
      setErrorMessage("Нийлүүлэгчийн нэр заавал бөглөнө.");
      return;
    }

    const input = {
      name: form.name.trim(),
      description: form.description || null,
      logoUrl: form.logoUrl || null,
      email: form.email || null,
      phone: form.phone || null,
      website: form.website || null,
      status: form.status || "ACTIVE",
      address:
        form.address1.trim() && form.province.trim()
          ? {
              address1: form.address1.trim(),
              address2: form.address2.trim() || null,
              province: form.province.trim(),
            }
          : null,
      ownerUserId: form.ownerUserId.trim() || null,
    };

    try {
      if (editingSupplier?.id) {
        await updateSupplier({ variables: { id: editingSupplier.id, input } });
      } else {
        await createSupplier({ variables: { input } });
      }
      setOpen(false);
      setEditingId(null);
      setToast({
        message: editingSupplier
          ? "Нийлүүлэгчийн мэдээллийг амжилттай шинэчиллээ."
          : "Нийлүүлэгчийг амжилттай бүртгэлээ.",
        severity: "success",
      });
      await suppliersQuery.refetch();
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <AbilityGuard action="read" subject={subject}>
      {suppliersQuery.loading ? (
        <StateView title="Нийлүүлэгчийн удирдлагыг ачаалж байна..." loading />
      ) : suppliersQuery.error ? (
        <StateView
          title="Нийлүүлэгчийн удирдлагыг ачаалж чадсангүй"
          description={suppliersQuery.error.message}
        />
      ) : (
        <>
          <PageToolbar
            search={search}
            onSearchChange={setSearch}
            onCreateClick={() => {
              setEditingId(null);
              setOpen(true);
            }}
            placeholder="Нийлүүлэгч хайх..."
            buttonText="Нийлүүлэгч нэмэх"
            showCreate={canCreate}
          />

          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              borderRadius: "0.75rem",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Нийлүүлэгч</TableCell>
                    <TableCell>Төлөв</TableCell>
                    <TableCell>Холбоо барих</TableCell>
                    <TableCell>Байршил</TableCell>
                    <TableCell align="right">Бүртгэл</TableCell>
                    <TableCell>Шинэчилсэн</TableCell>
                    <TableCell align="right">Үйлдэл</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {suppliers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                        Нийлүүлэгч олдсонгүй.
                      </TableCell>
                    </TableRow>
                  ) : (
                    suppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell>{supplier.name}</TableCell>
                        <TableCell>
                          {supplierStatusLabelMap[
                            supplier.status as keyof typeof supplierStatusLabelMap
                          ] ?? supplier.status}
                        </TableCell>
                        <TableCell>
                          {formatNullable(supplier.phone)} /{" "}
                          {formatNullable(supplier.email)}
                        </TableCell>
                        <TableCell>
                          {formatAddress([
                            supplier.address?.address1,
                            supplier.address?.address2,
                            supplier.address?.province,
                          ]) || "-"}
                        </TableCell>
                        <TableCell align="right">
                          {supplier.supplyItemCount}
                        </TableCell>
                        <TableCell>
                          {formatDateTime(supplier.updatedAt)}
                        </TableCell>
                        <TableCell align="right">
                          {supplier.id ? (
                            <Tooltip title="Дэлгэрэнгүй">
                              <IconButton
                                size="small"
                                onClick={() =>
                                  router.push(
                                    `/${rolePrefix}/suppliers/${supplier.id}`,
                                  )
                                }
                              >
                                <VisibilityOutlinedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          ) : null}
                          {canUpdate && supplier.id ? (
                            <Tooltip title="Засах">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setEditingId(supplier.id ?? null);
                                  setOpen(true);
                                }}
                              >
                                <EditOutlinedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          ) : null}
                          {canDelete && supplier.id ? (
                            <Tooltip title="Устгах">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => setDeleteId(supplier.id ?? null)}
                              >
                                <DeleteOutlineIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              {editingSupplier ? "Нийлүүлэгч засах" : "Нийлүүлэгч нэмэх"}
            </DialogTitle>
            <DialogContent dividers>
              {errorMessage ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorMessage}
                </Alert>
              ) : null}
              <TextField
                label="Нийлүүлэгчийн нэр"
                fullWidth
                margin="normal"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
              />
              <TextField
                label="Тайлбар"
                fullWidth
                multiline
                minRows={4}
                margin="normal"
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
              />
              <TextField
                label="Логоны холбоос"
                fullWidth
                margin="normal"
                value={form.logoUrl}
                onChange={(event) =>
                  setForm({ ...form, logoUrl: event.target.value })
                }
              />
              <TextField
                label="Имэйл"
                fullWidth
                margin="normal"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
              />
              <TextField
                label="Утас"
                fullWidth
                margin="normal"
                value={form.phone}
                onChange={(event) =>
                  setForm({ ...form, phone: event.target.value })
                }
              />
              <TextField
                label="Вэбсайт"
                fullWidth
                margin="normal"
                value={form.website}
                onChange={(event) =>
                  setForm({ ...form, website: event.target.value })
                }
              />
              <TextField
                select
                label="Төлөв"
                fullWidth
                margin="normal"
                value={form.status}
                onChange={(event) =>
                  setForm({ ...form, status: event.target.value })
                }
              >
                {SUPPLIER_STATUSES.map((value) => (
                  <MenuItem key={value} value={value}>
                    {supplierStatusLabelMap[value]}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Хаяг 1"
                fullWidth
                margin="normal"
                value={form.address1}
                onChange={(event) =>
                  setForm({ ...form, address1: event.target.value })
                }
              />
              <TextField
                label="Хаяг 2"
                fullWidth
                margin="normal"
                value={form.address2}
                onChange={(event) =>
                  setForm({ ...form, address2: event.target.value })
                }
              />
              <TextField
                label="Хот / бүс"
                fullWidth
                margin="normal"
                value={form.province}
                onChange={(event) =>
                  setForm({ ...form, province: event.target.value })
                }
              />
              {canCreate ? (
                <TextField
                  label="Эзэмшигч хэрэглэгчийн ID"
                  fullWidth
                  margin="normal"
                  helperText="Сонголтоор тухайн хэрэглэгчийг нийлүүлэгчийн эзэмшигчээр оноож болно"
                  value={form.ownerUserId}
                  onChange={(event) =>
                    setForm({ ...form, ownerUserId: event.target.value })
                  }
                />
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Болих</Button>
              <Button
                variant="contained"
                onClick={submitForm}
                disabled={createState.loading || updateState.loading}
              >
                {editingSupplier ? "Өөрчлөлт хадгалах" : "Бүртгэх"}
              </Button>
            </DialogActions>
          </Dialog>

          <ConfirmDialog
            open={!!deleteId}
            title="Нийлүүлэгч устгах уу?"
            confirmText="Устгах"
            loading={deleteState.loading}
            onClose={() => setDeleteId(null)}
            onConfirm={() => {
              if (!deleteId) return;
              deleteSupplier({ variables: { id: deleteId } });
            }}
          />
          <Toast
            open={!!toast}
            message={toast?.message ?? ""}
            severity={toast?.severity ?? "success"}
            onClose={() => setToast(null)}
          />
        </>
      )}
    </AbilityGuard>
  );
}
