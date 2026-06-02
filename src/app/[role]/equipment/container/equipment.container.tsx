"use client";

import { useMutation } from "@apollo/client/react";
import { debounce } from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

import AbilityGuard from "@/components/AbilityGuard";
import ConfirmDialog from "@/components/core/ConfirmDialog";
import StateView from "@/components/core/StateView";
import Toast from "@/components/core/Toast";
import PageToolbar from "@/components/forms/toolbar";
import { EQUIPMENT_DELETE } from "@/features/equipment/graphql/mutations.gql";
import type { EquipmentsQuery } from "@/generated/graphql";
import { useEquipmentsQuery, useHospitalsQuery } from "@/generated/hooks";
import { useActiveOrganization } from "@/hooks/useActiveOrganization";
import { getEquipmentSubjectForRole, getPortalRole } from "@/lib/casl";
import { useAbility } from "@/lib/casl/useAbility";

import EquipmentModal from "../components/equipment.modal";
import EquipmentListTable from "../components/euipment.list";

export default function EquipmentContainer() {
  const { data: session } = useSession();
  const params = useParams<{ role: string }>();
  const router = useRouter();
  const { activeOrganization } = useActiveOrganization();
  const portalRole = getPortalRole(
    session?.user ?? null,
    activeOrganization ?? null,
  );
  const subject = getEquipmentSubjectForRole(portalRole);

  const ability = useAbility();
  const canRead = ability.can("read", subject);
  const canCreate = ability.can("create", subject);
  const canUpdate = ability.can("update", subject);
  const canDelete = ability.can("delete", subject);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const handler = debounce(() => setDebouncedSearch(search), 500);
    handler();
    return () => handler.cancel();
  }, [search]);

  const { data, loading, error, refetch } = useEquipmentsQuery({
    variables: {
      where: {
        search: debouncedSearch || undefined,
      },
      take: rowsPerPage,
      skip: page * rowsPerPage,
    },
    fetchPolicy: "no-cache",
    skip: !canRead,
  });

  const equipmentsData: NonNullable<EquipmentsQuery["equipments"]> = {
    count: data?.equipments?.count ?? 0,
    data: data?.equipments?.data ?? [],
  };
  const editingEquipment = useMemo(
    () => equipmentsData.data?.find((item) => item.id === editingId) ?? null,
    [editingId, equipmentsData.data],
  );

  const { data: hospitalsData } = useHospitalsQuery({
    variables: { take: 50, skip: 0, where: undefined },
    fetchPolicy: "no-cache",
    skip: !canRead,
  });

  const hospitals = hospitalsData?.hospitals?.data ?? [];

  const [deleteEquipment, deleteState] = useMutation(EQUIPMENT_DELETE, {
    onCompleted: async () => {
      setToast({ message: "Амжилттай устгалаа.", severity: "success" });
      setDeleteId(null);
      await refetch();
    },
    onError: (err) => {
      setToast({ message: err.message, severity: "error" });
    },
  });

  const handleSuccess = async (message: string) => {
    setToast({ message, severity: "success" });
    setOpen(false);
    setEditingId(null);
    await refetch();
  };

  return (
    <AbilityGuard action="read" subject={subject}>
      {loading ? (
        <StateView title="Уншиж байна..." loading />
      ) : error ? (
        <StateView title="Алдаа гарлаа" description={error.message} />
      ) : (
        <>
          <PageToolbar
            search={search}
            onSearchChange={setSearch}
            onCreateClick={() => {
              setEditingId(null);
              setOpen(true);
            }}
            placeholder="Тоног төхөөрөмж хайх..."
            buttonText="Шинэ тоног төхөөрөмж"
            createDisabled={!canCreate}
          />
          <EquipmentModal
            open={open}
            mode={editingId ? "update" : "create"}
            initialData={editingEquipment}
            hospitals={hospitals}
            onClose={() => {
              setOpen(false);
              setEditingId(null);
            }}
            onSuccess={() =>
              handleSuccess(
                editingId ? "Амжилттай шинэчиллээ." : "Амжилттай үүсгэлээ.",
              )
            }
          />
          <EquipmentListTable
            equipments={equipmentsData}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(newPage) => {
              setPage(newPage);
            }}
            onRowsPerPageChange={(newRows) => {
              setRowsPerPage(newRows);
              setPage(0);
            }}
            loading={loading}
            onEdit={(id) => {
              setEditingId(id);
              setOpen(true);
            }}
            onView={(id) => router.push(`/${params.role}/equipment/${id}`)}
            onDelete={(id) => setDeleteId(id)}
            canUpdate={canUpdate}
            canDelete={canDelete}
          />
          <ConfirmDialog
            open={!!deleteId}
            title="Тоног төхөөрөмж устгах уу?"
            confirmText="Устгах"
            loading={deleteState.loading}
            onClose={() => setDeleteId(null)}
            onConfirm={() => {
              if (!deleteId) return;
              deleteEquipment({ variables: { equipmentDeleteId: deleteId } });
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
