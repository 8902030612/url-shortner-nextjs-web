"use client";
import styles from "./header.module.scss";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { IoClose, IoMenu } from "react-icons/io5";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  // const router = useRouter();
  const path = usePathname();
  const menuItems = [
    { item: "Home", pathName: "/" },
    { item: "Analytics", pathName: "/analytics" },
  ];
  return (
    <>
      <nav
        className="bg-white backdrop-blur-lg               
               [ bg-gradient-to-b from-white/60 to-white/30 ]
               [ shadow-black/50 shadow-2xl ]"
      >
        <div className="container mx-auto ">
          <div className="flex items-center justify-between h-[81px]">
            <div className="flex items-center">
              {/* logo */}
              <Link
                className="flex items-center justify-center"
                href={"https://veridocglobal.com/"}
              >
                <Image
                  alt="logo"
                  src="/logo.png"
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                />
                <span className={`fs-4 ${styles.vdg_logo} dark:text-white`}>
                  <span>VERIDOC</span>
                  <span className={styles.vdg_logo_gradient}>
                    &nbsp;Url Shortner
                  </span>
                </span>
              </Link>
            </div>
            <div className="">
              <ul className="tab:hidden flex list-none flex-row mr-auto font-bold text-base gap-5">
                <li>
                  <a
                    className={
                      path === "/"
                        ? "border-b-3 border-[#24984E] text-[#24984E] pb-7"
                        : "text-black hover:text-[#24984E]"
                    }
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className={
                      path === "/analytics"
                        ? "border-b-3 border-[#24984E] text-[#24984E] pb-7"
                        : "text-black hover:text-[#24984E]"
                    }
                    href="/analytics"
                  >
                    Analytics
                  </a>
                </li>
              </ul>
            </div>
            <div className="-mr-2 tab:flex hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:bg-gray-300"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? <IoMenu /> : <IoClose />}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="tab:block hidden" id="mobile-menu">
              {menuItems.map((menu, index) => (
                <div
                  ref={ref}
                  key={index}
                  className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
                >
                  <a
                    href={menu.pathName}
                    className={
                      path === menu.pathName
                        ? "flex items-center text-[#24984E] font-bold"
                        : "flex items-center hover:text-[#24984E]"
                    }
                  >
                    {menu.item}
                  </a>
                </div>
              ))}
            </div>
          )}
        </Transition>
      </nav>
    </>
  );
}

export default Nav;
