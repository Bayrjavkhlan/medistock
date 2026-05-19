import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
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
  Typography,
} from "@mui/material";

import TableSkeleton from "@/components/forms/table/tableSkeleton";
import type { EquipmentsQuery } from "@/generated/graphql";

type EquipmentListTableProps = {
  equipments: NonNullable<EquipmentsQuery["equipments"]>;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  canUpdate: boolean;
  canDelete: boolean;
  // sortBy: { field: UserSortField; order: EnumSortOrder };
  // onSort: (field: UserSortField, order: EnumSortOrder) => void;
  loading: boolean;
};

export default function EquipmentListTable({
  equipments,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  canUpdate,
  canDelete,
  // sortBy,
  // onSort,
  loading,
}: EquipmentListTableProps) {
  const columnCount = 7;
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 3,
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
              <TableCell>Тоног төхөөрөмж</TableCell>
              <TableCell>Ангилал</TableCell>
              <TableCell>Сериал дугаар</TableCell>
              <TableCell>Харьяалагдах эмнэлэг</TableCell>
              <TableCell>Хариуцсан ажилтан</TableCell>
              <TableCell>Төлөв</TableCell>
              <TableCell align="right">Үйлдэл</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={rowsPerPage} columns={columnCount} />
            ) : equipments.count === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount} align="center" sx={{ py: 4 }}>
                  Тоног төхөөрөмж олдсонгүй
                </TableCell>
              </TableRow>
            ) : (
              equipments.data?.map((equipment) => (
                <TableRow key={equipment.id}>
                  <TableCell>{equipment.name ?? "-"}</TableCell>
                  <TableCell>{equipment.category ?? "-"}</TableCell>
                  <TableCell>{equipment.serialNo ?? "-"}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {equipment.hospital?.name ?? "Эмнэлэг бүртгэлгүй"}
                      </Typography>
                      {equipment.hospital?.email ? (
                        <Typography variant="caption" color="text.secondary">
                          {equipment.hospital.email}
                        </Typography>
                      ) : null}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {equipment.assignedTo?.name ?? "Хариуцагч томилоогүй"}
                      </Typography>
                      {equipment.assignedTo?.email ? (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          {equipment.assignedTo.email}
                        </Typography>
                      ) : null}
                      {equipment.assignedTo?.phone ? (
                        <Typography variant="caption" color="text.secondary">
                          {equipment.assignedTo.phone}
                        </Typography>
                      ) : null}
                    </Box>
                  </TableCell>
                  <TableCell>{equipment.state ?? "-"}</TableCell>
                  <TableCell align="right">
                    {canUpdate ? (
                      <Tooltip title="Засах">
                        <IconButton
                          size="small"
                          onClick={() => {
                            if (!equipment.id) return;
                            onEdit(equipment.id);
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
                            if (!equipment.id) return;
                            onDelete(equipment.id);
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
        count={equipments.count}
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
