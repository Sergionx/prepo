"use client";

import { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  Selection,
  TableProps,
  TableBodyProps,
  InputProps,
} from "@nextui-org/react";

import useFilterTable, {
  StatusOption,
} from "@/lib/hooks/filter/useStatusFilter";
import useSortingTable from "@/lib/hooks/table/useSorting-Table";
import useInputFilterTable from "@/lib/hooks/filter/useInputFilter";
import usePagination from "@/lib/hooks/usePagination";
import useSelectColumnsTable, {
  Column,
} from "@/lib/hooks/table/useSelectColumns-Table";

import { Path } from "react-hook-form";
import { cn } from "@/lib/utils/classNames";

export type CustomDataTableType = typeof CustomDataTable;

export interface Props<T> extends Omit<TableProps, "children"> {
  data: T[];

  statusOptions: StatusOption[];
  keyStatus: keyof T;
  defaultStatus?: Selection;

  inputFilter: InputProps & {
    keyFilter: Path<T>;
  };

  initialVisibleColumns: string[];
  columns: Column[];

  emptyContent: string;
  children: TableBodyProps<T>["children"];

  customTopContent: (data: {
    inputFilterValue: string;

    statusFilter: Selection;
    setStatusFilter: React.Dispatch<React.SetStateAction<Selection>>;

    visibleColumns: Selection;
    setVisibleColumns: React.Dispatch<React.SetStateAction<Selection>>;

    onSearchChange: (value?: string) => void;
    onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onClear: () => void;

    length: number;
  }) => React.ReactNode;

  customBotContent: (data: {
    itemsLength: number;
    page: number;
    pages: number;
    onNextPage: () => void;
    onPreviousPage: () => void;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    filteredItemsLength: number;
  }) => React.ReactNode;
}

export default function CustomDataTable<T>({
  data,

  statusOptions,
  keyStatus,
  defaultStatus = "all",

  inputFilter,

  initialVisibleColumns,
  columns,
  emptyContent,
  children,
  customTopContent,
  customBotContent,
  ...props
}: Props<T>) {
  // const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const { visibleColumns, setVisibleColumns, headerColumns } =
    useSelectColumnsTable({ initialVisibleColumns, columns });

  const { sortedItems, setSortDescriptor, sortDescriptor } = useSortingTable({
    defaultSorting: {
      column: "name",
      direction: "ascending",
    },
    data,
  });

  // TODO Parametriza mejor en props data tagble
  const { filteredItems, statusFilter, setStatusFilter } = useFilterTable({
    data: sortedItems,
    defaultStatus,
    statusOptions,
    keyStatus,
  });

  const {
    inputFilterValue,
    filteredItems: inputFilteredItems,
    setInputFilterValue,
  } = useInputFilterTable({
    data: filteredItems,
    inputKeyFilter: inputFilter.keyFilter,
  });

  const { items, page, rowsPerPage, setRowsPerPage, setPage, pages } =
    usePagination({
      data: inputFilteredItems,
    });

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages, setPage]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [setPage, setRowsPerPage]
  );

  const onSearchChange = useCallback(
    (value?: string) => {
      if (value) {
        setInputFilterValue(value);
        setPage(1);
      } else {
        setInputFilterValue("");
      }
    },
    [setInputFilterValue, setPage]
  );

  const onClear = useCallback(() => {
    setInputFilterValue("");
    setPage(1);
  }, [setInputFilterValue, setPage]);

  return (
    <Table
      isHeaderSticky
      bottomContentPlacement="outside"
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
      {...props}
      topContent={customTopContent({
        inputFilterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        onClear,
        setStatusFilter,
        setVisibleColumns,
        length: data.length,
      })}
      bottomContent={customBotContent({
        itemsLength: items.length,
        page,
        pages,
        onNextPage,
        onPreviousPage,
        setPage,
        filteredItemsLength: filteredItems.length,
      })}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            allowsSorting={column.sortable}
            className={cn({
              "text-center": column.align === "center",
              "text-right": column.align === "end",
            })}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={emptyContent} items={items}>
        {children}
      </TableBody>
    </Table>
  );
}
