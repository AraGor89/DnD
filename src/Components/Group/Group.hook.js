import { useState } from "react";
import { cloneDeep } from "lodash";
import user1 from "../../images/user1.jpg";
import user2 from "../../images/user2.jpg";
import user3 from "../../images/user3.jpg";
import deckbg1 from "../../images/deckbg1.jpg";
import deckbg2 from "../../images/deckbg2.jpg";
import deckbg3 from "../../images/deckbg3.jpg";
import deckbg4 from "../../images/deckbg4.jpg";

const { v4: uuidv4 } = require("uuid");

const columnsMock = {
    [uuidv4()]: {
        items: [],
        role: "admin",
        name: "Abraham Lincoln",
        img: user1,
    },
};

const useGroup = ({}) => {
    const [loading, setLoading] = useState(false);
    const [columns, setColumns] = useState(columnsMock);
    const adminColumnId = Object.entries(columns)[0][0];

    const handleGetDecks = () => {
        setLoading(true);
        getDecks(1500)
            .then((decks) => {
                let columnsCopy = cloneDeep(columns);
                let oldDecks = Object.entries(columnsCopy)[0][1].items;
                let newDecks = [...oldDecks, ...decks];
                Object.entries(columnsCopy)[0][1].items = newDecks;

                setColumns(columnsCopy);
            })
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
    };

    const handleAddMember = () => {
        setLoading(true);
        getMember(1500)
            .then((members) => {
                let columnsCopy = cloneDeep(columns);
                let newColumn = members[Object.entries(columns).length - 1];
                columnsCopy = { ...columnsCopy, ...newColumn };

                setColumns(columnsCopy);
            })
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
    };

    const onDragEnd = (result, columns, setColumns) => {
        const { source, destination } = result;

        if (!result.destination || (source?.droppableId !== adminColumnId && source?.droppableId !== destination?.droppableId)) return;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            let [removed] = sourceItems.splice(source.index, 1);
            let newItem = { ...removed, id: removed.id + new Date() };
            destItems.splice(destination.index, 0, newItem);
            setColumns({
                ...columns,
                //   [source.droppableId]: {
                //     ...sourceColumn,
                //     items: sourceItems,
                //   },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    };

    const handleDeleteColumn = (columnId) => {
        let columnsCopy = cloneDeep(columns);
        delete columnsCopy[columnId];
        setColumns(columnsCopy);
    };

    const handleDeleteDeck = (columnId, deckId) => {
        let columnsCopy = cloneDeep(columns);
        const filteredItems = columnsCopy[columnId].items.filter((item) => item.id !== deckId);
        columnsCopy[columnId].items = filteredItems;

        setColumns(columnsCopy);
    };

    return { columns, setColumns, handleGetDecks, handleAddMember, onDragEnd, handleDeleteColumn, handleDeleteDeck, adminColumnId, loading };
};

export default useGroup;

const getDecks = (ms) => {
    return new Promise((resolve, reject) => {
        const decks = [
            { id: uuidv4(), bgImg: deckbg1, title: "Microbilogy of 21th Century", authorName: "John Smith", decksCount: 5 },
            { id: uuidv4(), bgImg: deckbg2, title: "The beauty of nature", authorName: "Greta Thunberg", decksCount: 5 },
            { id: uuidv4(), bgImg: deckbg3, title: "Some deck", authorName: "Some Author", decksCount: 5 },
            { id: uuidv4(), bgImg: deckbg4, title: "Some deck", authorName: "Some Author", decksCount: 5 },
            { id: uuidv4(), bgImg: deckbg1, title: "Some deck", authorName: "Some Author", decksCount: 5 },
        ];
        setTimeout(() => resolve(decks), ms);
    });
};

const getMember = (ms) => {
    return new Promise((resolve, reject) => {
        const members = [
            {
                [uuidv4()]: {
                    role: "member",
                    name: "George Washington",
                    items: [],
                    img: user1,
                },
            },
            {
                [uuidv4()]: {
                    role: "member",
                    name: "John Doe",
                    items: [],
                    img: user2,
                },
            },
            {
                [uuidv4()]: {
                    role: "member",
                    name: "Marilyn Monroe",
                    items: [],
                    img: user3,
                },
            },
            {
                [uuidv4()]: {
                    role: "member",
                    name: "Nelson Mandela",
                    items: [],
                    img: user3,
                },
            },
            {
                [uuidv4()]: {
                    role: "member",
                    name: "Martin Luther King",
                    items: [],
                    img: user3,
                },
            },
        ];

        setTimeout(() => resolve(members), ms);
    });
};
