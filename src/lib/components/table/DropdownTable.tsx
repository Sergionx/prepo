import { capitalize } from "@/lib/utils/strings";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
} from "@nextui-org/react";
import { IconChevronDown } from "@tabler/icons-react";
import React from "react";

interface Option {
  name: string;
  uid: string;
}

interface Props<T extends Option> {
  title: string;
  ariaLabel: string;

  selectionMode?: "single" | "multiple";
  selectedKeys: Selection;
  onSelectionChange: (keys: Selection) => void;
  options: T[];
}

export default function DropdownTable<T extends Option>({
  title,
  ariaLabel,
  selectionMode = "multiple",
  selectedKeys,
  onSelectionChange,
  options,
}: Props<T>) {
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
        aria-label={ariaLabel}
        closeOnSelect={selectionMode === "single"}
        selectedKeys={selectedKeys}
        selectionMode={selectionMode}
        onSelectionChange={onSelectionChange}
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
