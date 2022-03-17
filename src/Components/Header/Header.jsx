import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./Header.module.scss";

const Header = () => {
    return (
        <div className={styles.header}>
            <FaSearch className={styles.icon} />
            <input type="text" className={styles.input} placeholder="Search Zealoq" />
        </div>
    );
};

export default Header;
