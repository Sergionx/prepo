import { capitalize } from "@/lib/utils/strings";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
  DropdownMenuProps,
} from "@nextui-org/react";
import { IconChevronDown } from "@tabler/icons-react";
import React from "react";

interface Option {
  name: string;
  uid: string;
}

export interface DropdownTableProps<T extends Option> {
  title: string;

  selectionMode?: "single" | "multiple";
  selectedKeys: Selection;
  onSelectionChange: (keys: Selection) => void;
  options: T[];

  dropdownMenuProps: Omit<DropdownMenuProps, "children">;
}

export default function DropdownTable<T extends Option>({
  title,
  selectionMode = "multiple",
  selectedKeys,
  onSelectionChange,
  options,
  dropdownMenuProps,
}: DropdownTableProps<T>) {
  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex">
        <Button
          endContent={<IconChevronDown className="text-small" />}
          variant="flat"
        >
          {title}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        closeOnSelect={selectionMode === "single"}
        selectedKeys={selectedKeys}
        selectionMode={selectionMode}
        onSelectionChange={onSelectionChange}
        {...dropdownMenuProps}
      >
        {options.map((status) => (
          <DropdownItem key={status.uid} className="capitalize">
            {capitalize(status.name)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
