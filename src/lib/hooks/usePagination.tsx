import React from "react";

interface Props<T> {
  data: T[];
  defaultRowsPerPage?: number;
}

export default function usePagination<T>({
  data,
  defaultRowsPerPage = 5,
}: Props<T>) {
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
  const [page, setPage] = React.useState(1);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data, rowsPerPage]);

  const pages = Math.ceil(data.length / rowsPerPage);

  return {
    items,
    page,

    rowsPerPage,
    setRowsPerPage,
    setPage,

    pages,
  };
}
