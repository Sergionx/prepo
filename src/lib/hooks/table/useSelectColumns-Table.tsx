import { useMemo, useState } from "react";
import { Selection } from "@nextui-org/react";
import { columns } from "@/app/(private)/prueba/data";

interface Props {
  initialVisibleColumns: string[];
}

export default function useSelectColumnsTable({
  initialVisibleColumns,
}: Props) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
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
