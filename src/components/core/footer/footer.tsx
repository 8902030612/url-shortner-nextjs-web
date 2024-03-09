import React from "react";
import styles from "./footer.module.scss";

export default function Footer() {
  function currentYear(): number {
    return new Date().getFullYear();
  }
  return (
    <footer className={styles.footerMain}>
      <div className="p-4 text-center text-sm text-white">
        © {currentYear()} Copyright:&nbsp;
        <a className="text-white" href="https://veridocqrcode.com/">
          VeriDoc Global
        </a>
      </div>
    </footer>
  );
}
