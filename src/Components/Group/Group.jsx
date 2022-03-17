import cx from "classnames";
import Deck from "../Deck/Deck";
import useGroup from "./Group.hook";
import Author from "../Author/Author";
import styles from "./Group.module.scss";
import AddMember from "../AddMember/AddMember";
import ScrollContainer from "react-indiana-drag-scroll";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const { v4: uuidv4 } = require("uuid");

function Group() {
    const { columns, setColumns, handleGetDecks, handleAddMember, onDragEnd, handleDeleteColumn, handleDeleteDeck, adminColumnId, loading } = useGroup({});

    return (
        <ScrollContainer className="scroll-container" horizontal>
            <div className={styles.container}>
                {loading && (
                    <div className={styles.loadingContainer}>
                        <div className={styles.loading}>LOADING...</div>
                    </div>
                )}

                <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([columnId, column], index) => {
                        const isAdminColumn = columnId === adminColumnId;
                        return (
                            <div
                                className={cx(styles.column, {
                                    [styles.adminColumn]: isAdminColumn,
                                })}
                                key={columnId}
                            >
                                <Author
                                    img={column.img}
                                    name={column.name}
                                    role={column.role}
                                    columnId={columnId}
                                    addDecks={handleGetDecks}
                                    handleDeleteColumn={handleDeleteColumn}
                                />
                                <ScrollContainer className="scroll-container" vertical>
                                    <div>
                                        <Droppable droppableId={columnId} key={columnId}>
                                            {(provided, snapshot) => {
                                                return (
                                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                                        {column.items.map((item, index) => {
                                                            return (
                                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                                    {(provided, snapshot) => {
                                                                        return (
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                style={{ ...provided.draggableProps.style }}
                                                                            >
                                                                                <Deck item={item} handleDeleteDeck={handleDeleteDeck} columnId={columnId} />
                                                                            </div>
                                                                        );
                                                                    }}
                                                                </Draggable>
                                                            );
                                                        })}
                                                        {provided.placeholder}
                                                    </div>
                                                );
                                            }}
                                        </Droppable>
                                    </div>
                                </ScrollContainer>
                            </div>
                        );
                    })}
                    <AddMember addMember={handleAddMember} />
                </DragDropContext>
            </div>
        </ScrollContainer>
    );
}

export default Group;
