import cx from "classnames";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import styles from "./Author.module.scss";
import MoreAction from "../MoreAction/MoreAction";

const Author = ({ img, name, role, addDecks, columnId, handleDeleteColumn }) => {
    const [isDisable, setIsDisable] = useState(false);
    const isAdmin = role === "admin";

    const handleAddDecks = () => {
        addDecks();
        setIsDisable(true);
    };

    return (
        <div
            className={cx(styles.author, {
                [styles.adminBg]: isAdmin,
            })}
        >
            <div className={styles.authorInfo}>
                <img src={img} className={styles.img} alt="author image" />
                <div className={styles.personInfo}>
                    <div className={styles.name}>{name}</div>
                    <span
                        className={cx(styles.role, {
                            [styles.admin]: isAdmin,
                            [styles.member]: !isAdmin,
                        })}
                    >
                        {role}
                    </span>
                </div>
                <MoreAction type="column" handleDeleteColumn={handleDeleteColumn} columnId={columnId} />
            </div>

            {isAdmin && (
                <button onClick={handleAddDecks} disabled={isDisable}>
                    <BsPlus className={styles.plusIcon} />
                    Add decks
                </button>
            )}
        </div>
    );
};

export default Author;
