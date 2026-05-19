"use client";

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
import type { DrugsQuery } from "@/features/medicine/graphql/queries.gql";
import { formatDateTime, formatPrice } from "@/utils/detailFormatters";

type MedicineListTableProps = {
  drugs: NonNullable<DrugsQuery["drugs"]>;
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

export default function MedicineListTable({
  drugs,
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
}: MedicineListTableProps) {
  const columnCount = 10;

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
      <TableContainer sx={{ maxHeight: 680 }}>
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
              <TableCell>Эмийн нэр</TableCell>
              <TableCell>Ерөнхий нэр</TableCell>
              <TableCell>Хэлбэр</TableCell>
              <TableCell>Тун / хүч</TableCell>
              <TableCell>Үйлдвэрлэгч</TableCell>
              <TableCell align="right">Нийт нөөц</TableCell>
              <TableCell align="right">Доод үнэ</TableCell>
              <TableCell align="right">Салбар</TableCell>
              <TableCell>Үүсгэсэн</TableCell>
              <TableCell align="right">Үйлдэл</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={rowsPerPage} columns={columnCount} />
            ) : drugs.count === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount} align="center" sx={{ py: 4 }}>
                  Эмийн бүртгэл олдсонгүй
                </TableCell>
              </TableRow>
            ) : (
              drugs.data?.map((drug) => (
                <TableRow key={drug.id}>
                  <TableCell>{drug.name ?? "-"}</TableCell>
                  <TableCell>{drug.genericName ?? "-"}</TableCell>
                  <TableCell>{drug.dosageForm ?? "-"}</TableCell>
                  <TableCell>{drug.strength ?? "-"}</TableCell>
                  <TableCell>{drug.manufacturer ?? "-"}</TableCell>
                  <TableCell align="right">{drug.totalStock ?? 0}</TableCell>
                  <TableCell align="right">
                    {drug.startingPrice != null
                      ? formatPrice(drug.startingPrice)
                      : "-"}
                  </TableCell>
                  <TableCell align="right">
                    {drug.availabilityCount ?? 0}
                  </TableCell>
                  <TableCell>{formatDateTime(drug.createdAt)}</TableCell>
                  <TableCell align="right">
                    {drug.id ? (
                      <Tooltip title="Дэлгэрэнгүй харах">
                        <IconButton
                          size="small"
                          onClick={() => onView(drug.id!)}
                        >
                          <VisibilityOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {canUpdate && drug.id ? (
                      <Tooltip title="Засах">
                        <IconButton
                          size="small"
                          onClick={() => onEdit(drug.id!)}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {canDelete && drug.id ? (
                      <Tooltip title="Устгах">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onDelete(drug.id!)}
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
        count={drugs.count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(event) =>
          onRowsPerPageChange(parseInt(event.target.value, 10))
        }
        labelRowsPerPage="Хуудасны тоо:"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} / ${count}`}
      />
    </Paper>
  );
}
