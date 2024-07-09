import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
  Button,
  ButtonProps,
  ButtonGroupProps,
  DropdownProps,
  Selection,
} from "@nextui-org/react";
import { IconChevronDown } from "@tabler/icons-react";
import React from "react";

export interface ButtonDropdownProps {
  labelsMap: Record<string, string>;
  descriptionsMap: Record<string, string>;

  selectedOption: Set<string>;
  setSelectedOption: (value: Set<string>) => void;

  buttonGroupProps?: ButtonGroupProps;
  buttonProps?: ButtonProps;
  dropdownProps?: DropdownProps;
}

export default function ButtonDropdown({
  labelsMap,
  descriptionsMap,
  selectedOption,
  setSelectedOption,

  buttonGroupProps,
  buttonProps,
  dropdownProps,
}: ButtonDropdownProps) {
  const selectedOptionValue = Array.from(selectedOption)[0];

  return (
    <ButtonGroup {...buttonGroupProps}>
      <Button {...buttonProps}>{labelsMap[selectedOptionValue]}</Button>

      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <IconChevronDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Merge options"
          selectionMode="single"
          selectedKeys={selectedOption}
          // @ts-ignore
          onSelectionChange={setSelectedOption}
          className="max-w-[300px]"
          {...dropdownProps}
        >
          {Object.keys(labelsMap).map((key) => (
            <DropdownItem key={key} description={descriptionsMap[key]}>
              {labelsMap[key]}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}
