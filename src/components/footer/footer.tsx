import React from "react";
import styles from "./footer.module.scss";


export default function Footer() {
  return (
    <footer className={styles.footerMain}>
      <div className="p-4 text-center text-sm text-white">
        © 2023 Copyright:&nbsp; 
        <a
          className="text-white"
          href="https://veridocqrcode.com/"
        >
          VeriDoc Global
        </a>
      </div>
    </footer>
  );
}
