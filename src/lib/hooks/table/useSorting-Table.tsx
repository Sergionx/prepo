import { useState, useMemo } from "react";
import { SortDescriptor } from "@nextui-org/react";

interface Props<T> {
  defaultSorting: SortDescriptor;
  data: T[];
}

export default function useSortingTable<T>({ defaultSorting, data }: Props<T>) {
  const [sortDescriptor, setSortDescriptor] =
    useState<SortDescriptor>(defaultSorting);

  const sortedItems = useMemo(() => {
    return [...data].sort((a: T, b: T) => {
      const first = a[sortDescriptor.column as keyof T] as number;
      const second = b[sortDescriptor.column as keyof T] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, data]);

  return {
    sortedItems,
    sortDescriptor,
    setSortDescriptor,
  };
}
