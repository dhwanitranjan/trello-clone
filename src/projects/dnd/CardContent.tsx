import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { deleteToDoItem, editToDoItem } from "../../redux/dnd/dnd-slice";
import { dateNTimeFormatter } from "../../utils/dnd-utils";

type TCardContentProp = {
  id: number;
  toDoItems: TToDoItems[];
};

const CardContent = ({ id, toDoItems }: TCardContentProp) => {
  const [options, setOptions] = useState(0);
  const dispatch = useDispatch();
  const [editInfo, setEditInfo] = useState<TToDoItems>({
    id: 0,
    des: "",
    img: "",
    dateNTime: "",
  });
  const grid = 8;
  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle
  ) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    color: "black",
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  return (
    <div className="w-full">
      {toDoItems?.map((item, i) => {
        return (
          <Draggable key={item.id} draggableId={`${item.id}`} index={i}>
            {(provided, snapshot) => (
              <div
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style as
                    | DraggingStyle
                    | NotDraggingStyle
                )}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div
                  className="card text-white m-1 p-1"
                  style={{
                    backgroundColor: "gray",
                  }}
                >
                  <div className="ms-2 me-2 d-flex justify-content-between align-items-center position-relative z-1">
                    {editInfo.id === item.id ? (
                      <div className="create-card w_30 mh_10">
                        <input
                          className="form-control bg-black text-white"
                          value={editInfo.des}
                          onChange={(e) => {
                            setEditInfo((prev) => ({
                              ...prev,
                              des: e.target.value,
                            }));
                          }}
                        />
                        <div className="mt-2 d-flex">
                          {/* <input
                        className="form-control bg-black text-white"
                        value={editInfo.img}
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/png, image/jpeg"
                        onChange={(e) =>
                          setEditInfo((prev) => ({
                            ...prev,
                            img: e.target.img,
                          }))
                        }
                      /> */}
                          <input
                            className="form-control"
                            type="datetime-local"
                            id="meeting-time"
                            name="meeting-time"
                            value={editInfo.dateNTime}
                            onChange={(e) =>
                              setEditInfo((prev) => ({
                                ...prev,
                                dateNTime: e.target.value,
                              }))
                            }
                            style={{
                              backgroundColor: "#1b6794",
                              color: "#fff",
                            }}
                          />
                        </div>
                        <button
                          className="btn btn-transparent"
                          onClick={() => {
                            dispatch(
                              editToDoItem({
                                listId: id,
                                toDoId: item.id,
                                des: editInfo.des as string,
                                img: editInfo.img as string,
                                dateNTime: editInfo.dateNTime as string,
                              })
                            );
                            setEditInfo((prev) => ({ ...prev, id: 0 }));
                          }}
                          disabled={editInfo.des === ""}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-transparent text-white"
                          onClick={() => {
                            setEditInfo({
                              id: 0,
                              des: "",
                              img: "",
                              dateNTime: "",
                            });
                            setOptions(0);
                          }}
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div>{item.des}</div>
                        <div className="fs-16">
                          {dateNTimeFormatter(item.dateNTime || "")?.date}{" "}
                          {dateNTimeFormatter(item.dateNTime || "")?.time}
                        </div>
                        <div>{item.img}</div>
                      </div>
                    )}
                    {editInfo.id !== item.id && (
                      <button
                        className="btn btn-transparent z-1"
                        onClick={() =>
                          setOptions((prev) => (prev === 0 ? item.id : 0))
                        }
                      >
                        <FaEdit />
                      </button>
                    )}
                    {options === item?.id && (
                      <div className="position-absolute end-0 top-100 z-5">
                        <div className="card bg-gray border-color-white">
                          <button
                            className="btn btn-transparent d-flex justify-content-start"
                            onClick={() => {
                              dispatch(
                                deleteToDoItem({ listId: id, toDoId: item.id })
                              );
                              setOptions(0);
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-transparent d-flex justify-content-start"
                            onClick={() => {
                              setEditInfo({
                                id: item.id,
                                des: item.des,
                                img: item.img,
                                dateNTime: item.dateNTime,
                              });
                              setOptions(0);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Draggable>
        );
      })}
    </div>
  );
};

export default CardContent;
