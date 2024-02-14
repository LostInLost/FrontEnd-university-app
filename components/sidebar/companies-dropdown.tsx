"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import { AcmeIcon } from "../icons/acme-icon";
import { AcmeLogo } from "../icons/acmelogo";
import { BottomIcon } from "../icons/sidebar/bottom-icon";

interface Company {
  name: string;
  location: string;
  logo: React.ReactNode;
}

export const CompaniesDropdown = () => {
  const [company, setCompany] = useState<Company>({
    name: "Acme Co.",
    location: "Palo Alto, CA",
    logo: <AcmeIcon />,
  });
  return (
    <h1 className="text-lg font-bold">
      University Dashboard
    </h1>
  );
};
