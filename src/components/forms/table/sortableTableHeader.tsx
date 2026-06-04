import { Box, TableCell, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

type SortableTableHeaderProps = {
  field: string;
  label: string;
  currentSort: { field: string; order: "asc" | "desc" };
  onSort: (field: string, order: "asc" | "desc") => void;
};

export default function SortableTableHeader({
  field,
  label,
  currentSort,
  onSort,
}: SortableTableHeaderProps) {
  const isActive = currentSort.field === field;
  const direction = isActive ? currentSort.order : "asc";

  return (
    <TableCell>
      <TableSortLabel
        active={isActive}
        direction={direction}
        onClick={() => {
          const newOrder =
            isActive && currentSort.order === "asc" ? "desc" : "asc";
          onSort(field, newOrder);
        }}
      >
        {label}
        {isActive ? (
          <Box component="span" sx={visuallyHidden}>
            {currentSort.order === "desc"
              ? "sorted descending"
              : "sorted ascending"}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
}
