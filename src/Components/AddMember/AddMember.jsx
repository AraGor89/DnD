import React from "react";
import styles from "./AddMember.module.scss";
import { AiOutlineUserAdd } from "react-icons/ai";

const AddMember = ({ addMember }) => {
    return (
        <div onClick={addMember} className={styles.addMember}>
            <AiOutlineUserAdd className={styles.icon} />
            <span>Invite people</span>
        </div>
    );
};

export default AddMember;
