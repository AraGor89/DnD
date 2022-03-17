import { useState, useRef, useEffect } from "react";

const useTitle = ({}) => {
    const inputRef = useRef(null);
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("Collective learning");

    const handleModeChange = () => {
        setEditMode((editMode) => !editMode);
    };

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    useEffect(() => {
        if (editMode) inputRef.current.focus();
    }, [editMode]);

    return { title, inputRef, editMode, handleModeChange, handleChange };
};

export default useTitle;
