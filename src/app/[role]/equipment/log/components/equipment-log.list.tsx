import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import TableSkeleton from "@/components/forms/table/tableSkeleton";
import type { EquipmentLogsQuery } from "@/generated/hooks";

type EquipmentLogListProps = {
  logs: NonNullable<EquipmentLogsQuery["equipmentLogs"]>;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  loading: boolean;
};

export default function EquipmentLogList({
  logs,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  loading,
}: EquipmentLogListProps) {
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
              <TableCell>Огноо</TableCell>
              <TableCell>Тоног төхөөрөмж</TableCell>
              <TableCell>Гүйцэтгэсэн</TableCell>
              <TableCell>Тайлбар</TableCell>
              <TableCell align="right">Үйлдэл</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={rowsPerPage} columns={columnCount} />
            ) : logs.count === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount} align="center" sx={{ py: 4 }}>
                  Лог олдсонгүй
                </TableCell>
              </TableRow>
            ) : (
              logs.data?.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    {log.createdAt
                      ? new Date(log.createdAt).toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {log.equipment?.name ?? "-"}
                    {log.equipment?.serialNo
                      ? ` • ${log.equipment.serialNo}`
                      : ""}
                  </TableCell>
                  <TableCell>{log.performedBy?.name ?? "-"}</TableCell>
                  <TableCell>{log.description ?? "-"}</TableCell>
                  <TableCell align="right">-</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={logs.count}
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
