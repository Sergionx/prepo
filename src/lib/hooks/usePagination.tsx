import React from "react";

interface Props<T> {
  data: T[];
}

export default function usePagination<T>({ data }: Props<T>) {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
