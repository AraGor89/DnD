import React from "react";
import useTitle from "./Title.hook";
import styles from "./Title.module.scss";
import { MdGroups } from "react-icons/md";

const Title = () => {
    const { title, inputRef, editMode, handleModeChange, handleChange } = useTitle({});

    return (
        <div className={styles.title}>
            <MdGroups className={styles.icon} />
            {editMode ? <input value={title} ref={inputRef} onChange={handleChange} onBlur={handleModeChange} /> : <p onClick={handleModeChange}>{title}</p>}
        </div>
    );
};

export default Title;
