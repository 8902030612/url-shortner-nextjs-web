import Image from "next/image";
import React from "react";
import styles from "./header.module.scss";

export default function header() {
  return (
    <header>
      <nav className={`bg-[#f8f9fa] border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 ${styles.header} `}>
        <div className="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl">
          <a href="https://veridocglobal.com/" className="flex items-center">
            <Image
              alt=""
              src="/logo.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{" "}
            <span className={`fs-4 ${styles.vdg_logo}`}>
              <b>VERIDOC</b>
              <b className={styles.vdg_logo_gradient}>&nbsp;Url Shortner</b>
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
