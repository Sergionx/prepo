import { useMemo, useState } from "react";
import { Selection } from "@nextui-org/react";

export interface Column {
  name: string;
  uid: string;
  sortable?: boolean;
  align?: "start" | "center" | "end";
}

interface Props {
  initialVisibleColumns: string[];
  columns: Column[];
}

export default function useSelectColumnsTable({
  initialVisibleColumns,
  columns,
}: Props) {
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(initialVisibleColumns)
  );

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  return {
    visibleColumns,
    setVisibleColumns,
    headerColumns,
  };
}
