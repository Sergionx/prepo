import { useMemo, useState } from "react";

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface Props<T> {
  data: T[];
  inputKeyFilter: StringKeys<T>;
}

export default function useInputFilter<T>({
  data,
  inputKeyFilter,
}: Props<T>) {
  const [inputFilterValue, setInputFilterValue] = useState("");

  const hasSearchFilter = Boolean(inputFilterValue);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...data];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((item) =>
        (item[inputKeyFilter] as string)
          .toLowerCase()
          .includes(inputFilterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [data, inputFilterValue, hasSearchFilter, inputKeyFilter]);

  return {
    filteredItems,
    inputFilterValue,
    setInputFilterValue,
  };
}
