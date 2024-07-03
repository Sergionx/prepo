"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  Input,
  Button,
  Pagination,
  Selection,
  TableProps,
  TableBodyProps,
  InputProps,
  ButtonProps,
} from "@nextui-org/react";

import { IconBan, IconSearch } from "@tabler/icons-react";

import useFilterTable, {
  StatusOption,
} from "@/lib/hooks/filter/useStatusFilter";
import useSortingTable from "@/lib/hooks/table/useSorting-Table";
import useInputFilterTable from "@/lib/hooks/filter/useInputFilter";
import usePagination from "@/lib/hooks/usePagination";
import useSelectColumnsTable, {
  Column,
} from "@/lib/hooks/table/useSelectColumns-Table";
import DropdownTable, {
  DropdownTableProps,
} from "@/lib/components/table/DropdownTable";
import { Path } from "react-hook-form";
import { cn } from "@/lib/utils/classNames";
import ButtonDropdown, { ButtonDropdownProps } from "../ui/ButtonDropdown";

export type DataTableType = typeof DataTable;
type NoHookDropdownTableProps<T> = Omit<
  T,
  "selectedKeys" | "onSelectionChange" | "options"
>;

export interface Props<T> extends Omit<TableProps, "children"> {
  data: T[];

  statusOptions: StatusOption[];
  keyStatus: keyof T;
  defaultStatus?: Selection;

  inputFilter: InputProps & {
    keyFilter: Path<T>;
  };

  selectionButtonDropdownProps: ButtonDropdownProps & {
    onPress: (selectedKeys: Selection) => void;
  };
  statusDropdownProps: NoHookDropdownTableProps<
    DropdownTableProps<StatusOption>
  >;
  columnsDropdownProps: NoHookDropdownTableProps<DropdownTableProps<Column>>;

  initialVisibleColumns: string[];
  columns: Column[];

  emptyContent: string;
  children: TableBodyProps<T>["children"];
}

export default function DataTable<T>({
  data,

  statusOptions,
  keyStatus,
  defaultStatus = "all",

  inputFilter,

  selectionButtonDropdownProps,
  statusDropdownProps,
  columnsDropdownProps,

  initialVisibleColumns,
  columns,
  emptyContent,
  children,
  ...props
}: Props<T>) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

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

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <section className="flex flex-wrap justify-between gap-3 items-end">
          <Input
            isClearable
            startContent={<IconSearch />}
            value={inputFilterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            {...inputFilter}
            className={cn(
              "w-full max-w-[300px] disabled:opacity-50",
              inputFilter.className
            )}
          />
          <div className="flex gap-3">
            <DropdownTable
              selectedKeys={statusFilter}
              onSelectionChange={setStatusFilter}
              options={statusOptions}
              {...statusDropdownProps}
            />

            <DropdownTable
              selectedKeys={visibleColumns}
              onSelectionChange={setVisibleColumns}
              options={columns}
              {...columnsDropdownProps}
            />

            <ButtonDropdown
              {...selectionButtonDropdownProps}
              buttonProps={{
                onPress: () => {
                  selectionButtonDropdownProps.onPress(selectedKeys);
                },
                ...selectionButtonDropdownProps.buttonProps,
              }}
              buttonGroupProps={{
                isDisabled: selectedKeys !== "all" && selectedKeys.size === 0,
                ...selectionButtonDropdownProps.buttonGroupProps,
              }}
            />
          </div>
        </section>

        <section className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {data.length} users
          </span>

          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              value={rowsPerPage}
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </section>
      </div>
    );
  }, [
    inputFilterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    onClear,
    setStatusFilter,
    setVisibleColumns,
    selectedKeys,
    selectionButtonDropdownProps,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-1/3 text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-1/3 justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    items.length,
    page,
    pages,
    onNextPage,
    onPreviousPage,
    setPage,
    filteredItems.length,
  ]);

  return (
    <Table
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
      {...props}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            allowsSorting={column.sortable}
            // align={column.align}
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
