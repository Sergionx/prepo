import { useMemo, useState } from "react";
import { Selection } from "@nextui-org/react";

export interface StatusOption {
  name: string;
  uid: string;
}

interface Props<T> {
  data: T[];
  statusOptions: StatusOption[];
  defaultStatus?: Selection;

  keyStatus: keyof T;
}

export default function useFilter<T>({
  data,
  statusOptions,
  keyStatus,
  defaultStatus = "all",
}: Props<T>) {
  const [statusFilter, setStatusFilter] = useState<Selection>(defaultStatus);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...data];

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((item) => {
        const status = item[keyStatus] as string;
        return statusFilter.has(status);
      });
    }

    return filteredUsers;
  }, [data, statusFilter, keyStatus, statusOptions.length]);

  return {
    filteredItems,
    statusFilter,
    setStatusFilter,
  };
}
