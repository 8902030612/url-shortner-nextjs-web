import React from "react";
import styles from "./footer.module.scss";


export default function Footer() {
  return (
    <footer className={styles.footerMain}>
      <div className="p-4 text-center text-sm text-neutral-700 dark:text-neutral-200">
        © 2023 Copyright:&nbsp; 
        <a
          className="text-neutral-800 dark:text-neutral-400"
          href="https://veridocqrcode.com/"
        >
          VeriDoc Global
        </a>
      </div>
    </footer>
  );
}
