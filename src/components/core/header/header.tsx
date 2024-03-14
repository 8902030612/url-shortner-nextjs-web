"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  Link as NextLink,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import styles from "./header.module.scss";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const path = usePathname();
  const menuItems = [
    { item: "Home", index: "/" },
    { item: "Analytics", index: "/analytics" },
  ];

  return (
    <Navbar
      maxWidth="xl"
      height={`5rem`}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        item: [
          "font-semibold",
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-success",
          "data-[active=true]:font-bold",
        ],
      }}
    >
      <NavbarContent justify="center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />

        <a href="https://veridocglobal.com/" className="flex items-center">
          <NavbarBrand>
            <Image
              alt="logo"
              src="/logo.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />
            <span className={`fs-4 ${styles.vdg_logo}`}>
              <span>VERIDOC</span>
              <span className={styles.vdg_logo_gradient}>
                &nbsp;Url Shortner
              </span>
            </span>
          </NavbarBrand>
        </a>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        {menuItems.map((menuItem) => (
          <NavbarItem
            isActive={path === menuItem.index}
            key={`${menuItem.item}`}
          >
            <Link
              href={menuItem.index}
              aria-current="page"
              color={path === menuItem.index ? "success" : "foreground"}
            >
              {menuItem.item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((menuItem) => (
          <NavbarMenuItem
            key={`${menuItem.item}`}
            isActive={path === menuItem.index}
          >
            <NextLink
              color={path === menuItem.index ? "success" : "foreground"}
              className="w-full"
              href={menuItem.index}
              size="lg"
            >
              {menuItem.item}
            </NextLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
