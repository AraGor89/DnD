import cx from "classnames";
import useMoreAction from "./MoreAction.hook";
import styles from "./MoreAction.module.scss";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const MoreAction = ({ type, handleDeleteColumn, handleDeleteDeck, columnId, deckId }) => {
    const { isActiveAction, handleOpen, handleDelete } = useMoreAction({ handleDeleteColumn, columnId, handleDeleteDeck, deckId });

    return (
        <div className={styles.container}>
            <span className={styles.tooltipText}>More actions</span>
            <BiDotsHorizontalRounded
                onClick={handleOpen}
                className={cx(styles.moreIcon, {
                    [styles.deckType]: type === "deck",
                })}
            />
            {isActiveAction && (
                <div className={styles.actions} onClick={() => handleDelete(type)}>
                    <span>Delete {type}</span>
                </div>
            )}
        </div>
    );
};

export default MoreAction;
