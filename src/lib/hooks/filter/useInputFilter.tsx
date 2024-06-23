import { useMemo, useState } from "react";
import { Path } from "react-hook-form";

interface Props<T> {
  data: T[];
  inputKeyFilter: Path<T>;
}

export default function useInputFilter<T>({ data, inputKeyFilter }: Props<T>) {
  const [inputFilterValue, setInputFilterValue] = useState("");

  const hasSearchFilter = Boolean(inputFilterValue);

  const filteredItems = useMemo(() => {
    let filteredData = [...data];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) => {
        const valueToFilter = getNestedValue(item, inputKeyFilter);
        return valueToFilter
          ? valueToFilter
              .toString()
              .toLowerCase()
              .includes(inputFilterValue.toLowerCase())
          : false;
      });
    }

    return filteredData;
  }, [data, inputFilterValue, hasSearchFilter, inputKeyFilter]);

  return {
    filteredItems,
    inputFilterValue,
    setInputFilterValue,
  };
}

function getNestedValue(obj: any, path: string) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}
