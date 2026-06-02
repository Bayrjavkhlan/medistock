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
              <TableCell>Date</TableCell>
              <TableCell>Equipment</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Performed By</TableCell>
              <TableCell>Details</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={rowsPerPage} columns={columnCount} />
            ) : logs.count === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount} align="center" sx={{ py: 4 }}>
                  No equipment logs found
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
                      ? ` / ${log.equipment.serialNo}`
                      : ""}
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.75} alignItems="flex-start">
                      <Chip size="small" label={log.type ?? "GENERAL"} />
                      {log.status ? (
                        <Chip
                          size="small"
                          label={log.status}
                          variant="outlined"
                        />
                      ) : null}
                    </Stack>
                  </TableCell>
                  <TableCell>{log.performedBy?.name ?? "-"}</TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <span>{log.description ?? "-"}</span>
                      {log.problem ? <span>Problem: {log.problem}</span> : null}
                      {log.repairAction ? (
                        <span>Repair: {log.repairAction}</span>
                      ) : null}
                      {log.faultDate ? (
                        <span>
                          Fault date:{" "}
                          {new Date(log.faultDate).toLocaleDateString()}
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
        labelRowsPerPage="Rows per page:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
      />
    </Paper>
  );
}
