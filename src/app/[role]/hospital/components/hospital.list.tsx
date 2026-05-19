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
import type { HospitalsQuery } from "@/generated/graphql";

type HospitalListTableProps = {
  hospitals: NonNullable<HospitalsQuery["hospitals"]>;
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

export default function HospitalListTable({
  hospitals,
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
}: HospitalListTableProps) {
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
            ) : hospitals.count === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount} align="center" sx={{ py: 4 }}>
                  Эмнэлэг олдсонгүй
                </TableCell>
              </TableRow>
            ) : (
              hospitals.data?.map((hospital) => (
                <TableRow key={hospital.id}>
                  <TableCell>{hospital.name ?? "-"}</TableCell>
                  <TableCell>{hospital.email ?? "-"}</TableCell>
                  <TableCell>{hospital.phone ?? "-"}</TableCell>
                  <TableCell>
                    {[
                      hospital.address?.address1,
                      hospital.address?.address2,
                      hospital.address?.province,
                    ]
                      .filter(Boolean)
                      .join(", ") || "-"}
                  </TableCell>
                  <TableCell align="right">
                    {hospital.id ? (
                      <Tooltip title="Дэлгэрэнгүй харах">
                        <IconButton
                          size="small"
                          onClick={() => onView(hospital.id!)}
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
                            if (!hospital.id) return;
                            onEdit(hospital.id);
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
                            if (!hospital.id) return;
                            onDelete(hospital.id);
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
        count={hospitals.count}
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
