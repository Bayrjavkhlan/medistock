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
  TablePagination,
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
import TableSkeleton from "@/components/forms/table/tableSkeleton";
import PageToolbar from "@/components/forms/toolbar";
import {
  SUPPLY_AVAILABILITY,
  SUPPLY_CATEGORIES,
  supplyAvailabilityLabelMap,
  supplyCategoryLabelMap,
} from "@/features/supply/constants";
import {
  SUPPLY_ITEM_CREATE,
  SUPPLY_ITEM_DELETE,
  SUPPLY_ITEM_UPDATE,
} from "@/features/supply/graphql/mutations.gql";
import {
  SuppliersDocument,
  type SuppliersQuery,
  type SuppliersQueryVariables,
  SupplyItemsDocument,
  type SupplyItemsQuery,
  type SupplyItemsQueryVariables,
} from "@/features/supply/graphql/queries.gql";
import { useActiveOrganization } from "@/hooks/useActiveOrganization";
import { getPortalRole, getSupplyManagementSubject } from "@/lib/casl";
import { formatDateTime, formatPrice } from "@/utils/detailFormatters";

type FormState = {
  supplierId: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  model: string;
  brand: string;
  manufacturer: string;
  price: string;
  currency: string;
  availability: string;
  warranty: string;
  contactInfo: string;
  imageUrls: string;
  documentUrls: string;
  specifications: string;
};

const emptyForm: FormState = {
  supplierId: "",
  name: "",
  shortDescription: "",
  description: "",
  category: "OTHER",
  model: "",
  brand: "",
  manufacturer: "",
  price: "",
  currency: "USD",
  availability: "AVAILABLE",
  warranty: "",
  contactInfo: "",
  imageUrls: "",
  documentUrls: "",
  specifications: "",
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

const toMultiline = (items?: string[]) => (items ?? []).join("\n");

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export default function SupplyManagementContainer() {
  const router = useRouter();
  const subject = getSupplyManagementSubject();
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
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

  const supplyItemsQuery = useQuery<
    SupplyItemsQuery,
    SupplyItemsQueryVariables
  >(SupplyItemsDocument, {
    variables: {
      take: rowsPerPage,
      skip: page * rowsPerPage,
      where: {
        search: debouncedSearch || undefined,
        sortBy: "UPDATED_AT",
        sortOrder: "desc",
      },
    },
    fetchPolicy: "no-cache",
  });

  const suppliersQuery = useQuery<SuppliersQuery, SuppliersQueryVariables>(
    SuppliersDocument,
    {
      variables: { take: 100, skip: 0, where: undefined },
      fetchPolicy: "no-cache",
    },
  );

  const [createSupplyItem, createState] = useMutation(SUPPLY_ITEM_CREATE);
  const [updateSupplyItem, updateState] = useMutation(SUPPLY_ITEM_UPDATE);
  const [deleteSupplyItem, deleteState] = useMutation(SUPPLY_ITEM_DELETE, {
    onCompleted: async () => {
      setDeleteId(null);
      setToast({
        message: "Хангамжийг амжилттай устгалаа.",
        severity: "success",
      });
      await supplyItemsQuery.refetch();
    },
    onError: (error) => {
      setToast({ message: error.message, severity: "error" });
    },
  });

  const canCreate =
    portalRole === "ADMIN" ||
    portalRole === "SUPPLIER_OWNER" ||
    portalRole === "SUPPLIER_MANAGER";
  const canUpdate = canCreate;
  const canDelete = canCreate;

  const suppliers = suppliersQuery.data?.suppliers?.data ?? [];
  const supplyItems = supplyItemsQuery.data?.supplyItems?.data ?? [];
  const count = supplyItemsQuery.data?.supplyItems?.count ?? 0;
  const editingItem = useMemo(
    () => supplyItems.find((item) => item.id === editingId) ?? null,
    [editingId, supplyItems],
  );

  useEffect(() => {
    if (!open) return;
    if (editingItem) {
      setForm({
        supplierId: editingItem.supplierId,
        name: editingItem.name,
        shortDescription: editingItem.shortDescription ?? "",
        description: editingItem.description ?? "",
        category: editingItem.category,
        model: editingItem.model ?? "",
        brand: editingItem.brand ?? "",
        manufacturer: editingItem.manufacturer ?? "",
        price: editingItem.price != null ? String(editingItem.price) : "",
        currency: editingItem.currency ?? "USD",
        availability: editingItem.availability,
        warranty: editingItem.warranty ?? "",
        contactInfo: editingItem.contactInfo ?? "",
        imageUrls: toMultiline(editingItem.imageUrls),
        documentUrls: toMultiline(editingItem.documentUrls),
        specifications: editingItem.specifications
          ? JSON.stringify(editingItem.specifications, null, 2)
          : "",
      });
    } else {
      setForm({
        ...emptyForm,
        supplierId: suppliers[0]?.id ?? "",
      });
    }
    setErrorMessage(null);
  }, [editingItem, open, suppliers]);

  const submitForm = async () => {
    if (!form.name.trim() || !form.supplierId || !form.category) {
      setErrorMessage("Нэр, нийлүүлэгч, ангилал заавал бөглөнө.");
      return;
    }

    let parsedSpecifications: unknown = null;
    if (form.specifications.trim()) {
      try {
        parsedSpecifications = JSON.parse(form.specifications);
      } catch {
        setErrorMessage("Үзүүлэлт нь зөв JSON форматтай байх ёстой.");
        return;
      }
    }

    const input = {
      supplierId: form.supplierId,
      name: form.name.trim(),
      shortDescription: form.shortDescription || null,
      description: form.description || null,
      category: form.category,
      model: form.model || null,
      brand: form.brand || null,
      manufacturer: form.manufacturer || null,
      price: form.price ? Number(form.price) : null,
      currency: form.currency || "USD",
      availability: form.availability || "AVAILABLE",
      warranty: form.warranty || null,
      contactInfo: form.contactInfo || null,
      imageUrls: parseLines(form.imageUrls),
      documentUrls: parseLines(form.documentUrls),
      specifications: parsedSpecifications,
    };

    try {
      if (editingItem?.id) {
        await updateSupplyItem({ variables: { id: editingItem.id, input } });
      } else {
        await createSupplyItem({ variables: { input } });
      }
      setOpen(false);
      setEditingId(null);
      setToast({
        message: editingItem
          ? "Хангамжийн мэдээллийг амжилттай шинэчиллээ."
          : "Хангамжийг амжилттай бүртгэлээ.",
        severity: "success",
      });
      await supplyItemsQuery.refetch();
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <AbilityGuard action="read" subject={subject}>
      {supplyItemsQuery.loading || suppliersQuery.loading ? (
        <StateView title="Хангамжийн удирдлагыг ачаалж байна..." loading />
      ) : supplyItemsQuery.error || suppliersQuery.error ? (
        <StateView
          title="Хангамжийн удирдлагыг ачаалж чадсангүй"
          description={
            (supplyItemsQuery.error || suppliersQuery.error)?.message
          }
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
            placeholder="Хангамж хайх..."
            buttonText="Хангамж нэмэх"
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
                    <TableCell>Нэр</TableCell>
                    <TableCell>Нийлүүлэгч</TableCell>
                    <TableCell>Ангилал</TableCell>
                    <TableCell align="right">Үнэ</TableCell>
                    <TableCell>Төлөв</TableCell>
                    <TableCell>Шинэчилсэн</TableCell>
                    <TableCell align="right">Үйлдэл</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {supplyItemsQuery.loading ? (
                    <TableSkeleton rows={rowsPerPage} columns={7} />
                  ) : count === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                        Хангамж олдсонгүй.
                      </TableCell>
                    </TableRow>
                  ) : (
                    supplyItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.supplier.name}</TableCell>
                        <TableCell>
                          {supplyCategoryLabelMap[
                            item.category as keyof typeof supplyCategoryLabelMap
                          ] ?? item.category}
                        </TableCell>
                        <TableCell align="right">
                          {item.price != null
                            ? `${formatPrice(item.price)} ${item.currency ?? ""}`.trim()
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {supplyAvailabilityLabelMap[
                            item.availability as keyof typeof supplyAvailabilityLabelMap
                          ] ?? item.availability}
                        </TableCell>
                        <TableCell>{formatDateTime(item.updatedAt)}</TableCell>
                        <TableCell align="right">
                          {item.id ? (
                            <Tooltip title="Дэлгэрэнгүй">
                              <IconButton
                                size="small"
                                onClick={() =>
                                  router.push(
                                    `/${rolePrefix}/supply/${item.id}`,
                                  )
                                }
                              >
                                <VisibilityOutlinedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          ) : null}
                          {canUpdate && item.id ? (
                            <Tooltip title="Засах">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setEditingId(item.id ?? null);
                                  setOpen(true);
                                }}
                              >
                                <EditOutlinedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          ) : null}
                          {canDelete && item.id ? (
                            <Tooltip title="Устгах">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => setDeleteId(item.id ?? null)}
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
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25]}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          </Paper>

          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              {editingItem ? "Хангамж засах" : "Хангамж нэмэх"}
            </DialogTitle>
            <DialogContent dividers>
              {errorMessage ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorMessage}
                </Alert>
              ) : null}
              <TextField
                select
                label="Нийлүүлэгч"
                fullWidth
                margin="normal"
                value={form.supplierId}
                onChange={(event) =>
                  setForm({ ...form, supplierId: event.target.value })
                }
                disabled={suppliers.length <= 1}
              >
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier.id} value={supplier.id ?? ""}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Нэр"
                fullWidth
                margin="normal"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
              />
              <TextField
                label="Товч тайлбар"
                fullWidth
                margin="normal"
                value={form.shortDescription}
                onChange={(event) =>
                  setForm({ ...form, shortDescription: event.target.value })
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
                select
                label="Ангилал"
                fullWidth
                margin="normal"
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
              >
                {SUPPLY_CATEGORIES.map((value) => (
                  <MenuItem key={value} value={value}>
                    {supplyCategoryLabelMap[value]}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Загвар"
                fullWidth
                margin="normal"
                value={form.model}
                onChange={(event) =>
                  setForm({ ...form, model: event.target.value })
                }
              />
              <TextField
                label="Брэнд"
                fullWidth
                margin="normal"
                value={form.brand}
                onChange={(event) =>
                  setForm({ ...form, brand: event.target.value })
                }
              />
              <TextField
                label="Үйлдвэрлэгч"
                fullWidth
                margin="normal"
                value={form.manufacturer}
                onChange={(event) =>
                  setForm({ ...form, manufacturer: event.target.value })
                }
              />
              <TextField
                label="Үнэ"
                type="number"
                fullWidth
                margin="normal"
                value={form.price}
                onChange={(event) =>
                  setForm({ ...form, price: event.target.value })
                }
              />
              <TextField
                label="Валют"
                fullWidth
                margin="normal"
                value={form.currency}
                onChange={(event) =>
                  setForm({ ...form, currency: event.target.value })
                }
              />
              <TextField
                select
                label="Бэлэн байдал"
                fullWidth
                margin="normal"
                value={form.availability}
                onChange={(event) =>
                  setForm({ ...form, availability: event.target.value })
                }
              >
                {SUPPLY_AVAILABILITY.map((value) => (
                  <MenuItem key={value} value={value}>
                    {supplyAvailabilityLabelMap[value]}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Баталгаа"
                fullWidth
                margin="normal"
                value={form.warranty}
                onChange={(event) =>
                  setForm({ ...form, warranty: event.target.value })
                }
              />
              <TextField
                label="Холбоо барих мэдээлэл"
                fullWidth
                margin="normal"
                value={form.contactInfo}
                onChange={(event) =>
                  setForm({ ...form, contactInfo: event.target.value })
                }
              />
              <TextField
                label="Зургийн холбоосууд"
                fullWidth
                multiline
                minRows={3}
                margin="normal"
                helperText="Нэг мөрөнд нэг холбоос"
                value={form.imageUrls}
                onChange={(event) =>
                  setForm({ ...form, imageUrls: event.target.value })
                }
              />
              <TextField
                label="Баримт бичгийн холбоосууд"
                fullWidth
                multiline
                minRows={3}
                margin="normal"
                helperText="Нэг мөрөнд нэг холбоос"
                value={form.documentUrls}
                onChange={(event) =>
                  setForm({ ...form, documentUrls: event.target.value })
                }
              />
              <TextField
                label="Үзүүлэлтүүд (JSON)"
                fullWidth
                multiline
                minRows={5}
                margin="normal"
                value={form.specifications}
                onChange={(event) =>
                  setForm({ ...form, specifications: event.target.value })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Болих</Button>
              <Button
                variant="contained"
                onClick={submitForm}
                disabled={createState.loading || updateState.loading}
              >
                {editingItem ? "Өөрчлөлт хадгалах" : "Бүртгэх"}
              </Button>
            </DialogActions>
          </Dialog>

          <ConfirmDialog
            open={!!deleteId}
            title="Хангамж устгах уу?"
            confirmText="Устгах"
            loading={deleteState.loading}
            onClose={() => setDeleteId(null)}
            onConfirm={() => {
              if (!deleteId) return;
              deleteSupplyItem({ variables: { id: deleteId } });
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
