"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  Tooltip,
} from "@nextui-org/react";

import { columns, users, statusOptions } from "./data";
import { IconBan, IconCheck, IconSearch } from "@tabler/icons-react";

import useFilterTable from "@/lib/hooks/table/useStatusFilter-Table";
import useSortingTable from "@/lib/hooks/table/useSorting-Table";
import useInputFilterTable from "@/lib/hooks/table/useInputFilter-Table";
import usePaginationTable from "@/lib/hooks/table/usePagination-Table";
import useSelectColumnsTable from "@/lib/hooks/table/useSelectColumns-Table";
import DropdownTable from "@/lib/components/table/DropdownTable";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

type User = (typeof users)[0];

export default function App() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const { visibleColumns, setVisibleColumns, headerColumns } =
    useSelectColumnsTable({ initialVisibleColumns: INITIAL_VISIBLE_COLUMNS });

  const { sortedItems, setSortDescriptor, sortDescriptor } = useSortingTable({
    defaultSorting: {
      column: "name",
      direction: "ascending",
    },
    data: users,
  });

  const { filteredItems, statusFilter, setStatusFilter } = useFilterTable({
    data: sortedItems,
    statusOptions,
    keyStatus: "status",
  });

  const {
    inputFilterValue,
    filteredItems: inputFilteredItems,
    setInputFilterValue,
  } = useInputFilterTable({ data: filteredItems, inputKeyFilter: "name" });

  const { items, page, rowsPerPage, setRowsPerPage, setPage, pages } =
    usePaginationTable({
      data: inputFilteredItems,
    });

  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <Tooltip color="success" content={`Aceptar ${user.name}`}>
            <Button
              isIconOnly
              variant="light"
              color="success"
              className="text-lg active:opacity-50"
            >
              <IconCheck />
            </Button>
          </Tooltip>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setInputFilterValue(value);
      setPage(1);
    } else {
      setInputFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setInputFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <section className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<IconSearch />}
            value={inputFilterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <DropdownTable
              ariaLabel="Table Status"
              title="Status"
              selectedKeys={statusFilter}
              onSelectionChange={setStatusFilter}
              options={statusOptions}
            />

            <DropdownTable
              ariaLabel="Table Columns"
              title="Columns"
              selectedKeys={visibleColumns}
              onSelectionChange={setVisibleColumns}
              options={columns}
            />

            <Button
              color="danger"
              onClick={() => console.log(selectedKeys)}
              className="ml-auto h-auto"
              startContent={<IconBan />}
            >
              Descalificar seleccionados
            </Button>
          </div>
        </section>

        <section className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
          </span>

          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
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
    users.length,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
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
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      color="danger"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent="No hay estudiantes postulados aún" items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
