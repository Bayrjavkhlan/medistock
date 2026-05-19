import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";

import SortableTableHeader from "@/components/forms/table/sortableTableHeader";
import StyledTableHeadCell from "@/components/forms/table/styledTableHeader";
import TableSkeleton from "@/components/forms/table/tableSkeleton";
import type { StaffSortField } from "@/constants/types";
import type { Membership } from "@/generated/graphql";
import { EnumSortOrder } from "@/generated/graphql";

type StaffListTableProps = {
  memberships: Membership[];
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  sortBy: { field: StaffSortField; order: EnumSortOrder };
  onSort: (field: StaffSortField, order: EnumSortOrder) => void;
  onEdit: (membershipId: string) => void;
  onDelete: (membershipId: string) => void;
  canUpdate: boolean;
  canDelete: boolean;
  loading: boolean;
};

export default function StaffListTable({
  memberships,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  sortBy,
  onSort,
  onEdit,
  onDelete,
  canUpdate,
  canDelete,
  loading,
}: StaffListTableProps) {
  const columnCount = 6; // Нэр, и-мэйл, утас, байгууллага, үүрэг, үйлдэл
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: "0.75rem",
        border: "1px solid",
        borderColor: "divider",
      }}
      className="shadow-sm"
    >
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table
          stickyHeader
          sx={{
            "& tbody tr:hover": {
              backgroundColor: "action.hover",
            },
            "& th": {
              backgroundColor: "background.paper",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <SortableTableHeader
                field="name"
                label="Нэр"
                currentSort={{
                  field: sortBy.field,
                  order: sortBy.order === EnumSortOrder.Asc ? "asc" : "desc",
                }}
                onSort={(field, order) => {
                  onSort(
                    field as StaffSortField,
                    order === "asc" ? EnumSortOrder.Asc : EnumSortOrder.Desc,
                  );
                }}
              />
              <SortableTableHeader
                field="email"
                label="И-мэйл"
                currentSort={{
                  field: sortBy.field,
                  order: sortBy.order === EnumSortOrder.Asc ? "asc" : "desc",
                }}
                onSort={(field, order) => {
                  onSort(
                    field as StaffSortField,
                    order === "asc" ? EnumSortOrder.Asc : EnumSortOrder.Desc,
                  );
                }}
              />
              <StyledTableHeadCell>Утас</StyledTableHeadCell>
              <StyledTableHeadCell>Байгууллага</StyledTableHeadCell>
              <StyledTableHeadCell>Үүрэг</StyledTableHeadCell>
              <StyledTableHeadCell align="right">Үйлдэл</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={rowsPerPage} columns={columnCount} />
            ) : memberships.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount} align="center" sx={{ py: 4 }}>
                  Хэрэглэгч олдсонгүй
                </TableCell>
              </TableRow>
            ) : (
              memberships.map((membership) => (
                <TableRow key={membership.id ?? membership.user?.id}>
                  <TableCell>{membership.user?.name ?? "-"}</TableCell>
                  <TableCell>{membership.user?.email ?? "-"}</TableCell>
                  <TableCell>{membership.user?.phone ?? "-"}</TableCell>
                  <TableCell>{membership.organization?.name ?? "-"}</TableCell>
                  <TableCell>{membership.role ?? "-"}</TableCell>
                  <TableCell align="right">
                    {canUpdate ? (
                      <Tooltip title="Засах">
                        <IconButton
                          size="small"
                          onClick={() => {
                            if (!membership.id) return;
                            onEdit(membership.id);
                          }}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {canDelete ? (
                      <Tooltip title="Устгах">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            if (!membership.id) return;
                            onDelete(membership.id);
                          }}
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
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(e) =>
          onRowsPerPageChange(parseInt(e.target.value, 10))
        }
        labelRowsPerPage="Хуудасны тоо:"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} / ${count}`}
      />
    </Paper>
  );
}
