import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactElement } from "react";

interface DropdownProps {
  trigger: ReactElement;
  dropdownItems: ReactElement[];
}

export default function Dropdown({ trigger, dropdownItems }: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {dropdownItems.map((dropdownItem, index) => (
          <DropdownMenuItem key={index}>{dropdownItem}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
