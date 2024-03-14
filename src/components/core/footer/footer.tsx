import React from "react";
import styles from "./footer.module.scss";
import Image from "next/image";
import { navItems } from "@/utils/table";

export default function Footer() {
  function currentYear(): number {
    return new Date().getFullYear();
  }
  return (
    <footer className={`${styles.footerMain} `}>
      <div className="container mx-auto py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="https://veridocglobal.com/" className="flex items-center">
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
          </a>

          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-300 sm:mb-0 dark:text-gray-400">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className={`hover:underline ${
                    index < navItems.length - 1 ? "me-4 md:me-6" : ""
                  }`}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-300 sm:text-center dark:text-gray-400 font-semibold">
          © {currentYear()} Copyright:&nbsp;
          <a href="https://veridocglobal.com/">VeriDoc Global</a>
        </span>
      </div>
    </footer>
  );
}
