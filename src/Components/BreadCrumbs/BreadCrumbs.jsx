import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import styles from "./BreadCrumbs.module.scss";

const BreadCrumbs = () => {
    return (
        <div className={styles.breadCrumbs}>
            <FaChevronLeft className={styles.icon} />
            <span> Breadcrumbs</span>
        </div>
    );
};

export default BreadCrumbs;
