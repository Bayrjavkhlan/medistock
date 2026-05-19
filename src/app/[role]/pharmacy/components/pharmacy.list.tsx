import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
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

import TableSkeleton from "@/components/forms/table/tableSkeleton";
import type { PharmaciesQuery } from "@/generated/hooks";

type PharmacyListTableProps = {
  pharmacies: NonNullable<PharmaciesQuery["pharmacies"]>;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  canUpdate: boolean;
  canDelete: boolean;
  loading: boolean;
};

export default function PharmacyListTable({
  pharmacies,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onView,
  onEdit,
  onDelete,
  canUpdate,
  canDelete,
  loading,
}: PharmacyListTableProps) {
  const columnCount = 5;
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
              <TableCell>Нэр</TableCell>
              <TableCell>И-мэйл</TableCell>
              <TableCell>Утас</TableCell>
              <TableCell>Хаяг</TableCell>
              <TableCell align="right">Үйлдэл</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={rowsPerPage} columns={columnCount} />
            ) : pharmacies.count === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount} align="center" sx={{ py: 4 }}>
                  Эмийн сан олдсонгүй
                </TableCell>
              </TableRow>
            ) : (
              pharmacies.data?.map((pharmacy) => (
                <TableRow key={pharmacy.id}>
                  <TableCell>{pharmacy.name ?? "-"}</TableCell>
                  <TableCell>{pharmacy.email ?? "-"}</TableCell>
                  <TableCell>{pharmacy.phone ?? "-"}</TableCell>
                  <TableCell>
                    {[
                      pharmacy.address?.address1,
                      pharmacy.address?.address2,
                      pharmacy.address?.province,
                    ]
                      .filter(Boolean)
                      .join(", ") || "-"}
                  </TableCell>
                  <TableCell align="right">
                    {pharmacy.id ? (
                      <Tooltip title="Дэлгэрэнгүй харах">
                        <IconButton
                          size="small"
                          onClick={() => onView(pharmacy.id!)}
                        >
                          <VisibilityOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {canUpdate ? (
                      <Tooltip title="Засах">
                        <IconButton
                          size="small"
                          onClick={() => {
                            if (!pharmacy.id) return;
                            onEdit(pharmacy.id);
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
                            if (!pharmacy.id) return;
                            onDelete(pharmacy.id);
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
        count={pharmacies.count}
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
