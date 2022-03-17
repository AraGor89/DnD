import React from "react";
import styles from "./Deck.module.scss";
import common from "../../images/common.jpg";
import MoreAction from "../MoreAction/MoreAction";

const Deck = ({ item, columnId, handleDeleteDeck }) => {
    const { bgImg, title, authorName, decksCount, id } = item;

    return (
        <div className={styles.deck}>
            <div className={styles.bgImgBlock} style={{ backgroundImage: `url(${bgImg})` }}>
                <div className={styles.deckInfo}>
                    <img src={common} className={styles.commonImg} alt="deck" />
                    <div className={styles.nameTitleBlock}>
                        <div className={styles.title}>{title}</div>
                        <span className={styles.name}>{authorName}</span>
                    </div>
                    <MoreAction type="deck" handleDeleteDeck={handleDeleteDeck} deckId={id} columnId={columnId} />
                </div>
            </div>
            <p className={styles.decksCount}>{`${decksCount} cards`}</p>
        </div>
    );
};

export default Deck;
