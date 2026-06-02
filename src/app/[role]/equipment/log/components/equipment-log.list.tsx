import {
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import TableSkeleton from "@/components/forms/table/tableSkeleton";
import {
  formatEquipmentLogStatus,
  formatEquipmentLogType,
} from "@/features/equipment/display";
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
  const columnCount = 6;

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
              <TableCell>Төрөл</TableCell>
              <TableCell>Гүйцэтгэсэн</TableCell>
              <TableCell>Дэлгэрэнгүй</TableCell>
              <TableCell align="right">Үйлдэл</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={rowsPerPage} columns={columnCount} />
            ) : logs.count === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount} align="center" sx={{ py: 4 }}>
                  Тоног төхөөрөмжийн лог олдсонгүй
                </TableCell>
              </TableRow>
            ) : (
              logs.data?.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    {log.createdAt
                      ? new Date(log.createdAt).toLocaleString("mn-MN")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {log.equipment?.name ?? "-"}
                    {log.equipment?.serialNo
                      ? ` / ${log.equipment.serialNo}`
                      : ""}
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.75} alignItems="flex-start">
                      <Chip
                        size="small"
                        label={formatEquipmentLogType(log.type)}
                      />
                      {log.status ? (
                        <Chip
                          size="small"
                          label={formatEquipmentLogStatus(log.status)}
                          variant="outlined"
                        />
                      ) : null}
                    </Stack>
                  </TableCell>
                  <TableCell>{log.performedBy?.name ?? "-"}</TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <span>{log.description ?? "-"}</span>
                      {log.problem ? <span>Асуудал: {log.problem}</span> : null}
                      {log.repairAction ? (
                        <span>Засвар: {log.repairAction}</span>
                      ) : null}
                      {log.faultDate ? (
                        <span>
                          Гэмтлийн огноо:{" "}
                          {new Date(log.faultDate).toLocaleDateString("mn-MN")}
                        </span>
                      ) : null}
                    </Stack>
                  </TableCell>
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
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
      />
    </Paper>
  );
}
