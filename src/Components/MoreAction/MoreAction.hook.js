import { useState, useEffect } from "react";

const useMoreAction = ({ handleDeleteColumn, handleDeleteDeck, columnId, deckId }) => {
    const [isActiveAction, setIsActiveAction] = useState(false);

    useEffect(() => {
        const outSideClickListener = (e) => {
            if (isActiveAction) setIsActiveAction(false);
        };

        window.addEventListener("click", outSideClickListener);
        return () => window.removeEventListener("click", outSideClickListener);
    }, [isActiveAction]);

    const handleOpen = () => setIsActiveAction(true);

    const handleDelete = (type) => {
        if (type === "column") handleDeleteColumn(columnId);
        if (type === "deck") handleDeleteDeck(columnId, deckId);
    };

    return { isActiveAction, handleOpen, handleDelete };
};

export default useMoreAction;
