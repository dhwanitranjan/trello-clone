import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";

const CardContent = ({
  content,
  deleteContent,
  handleEditValue,
}: TCardContentProp) => {
  const [options, setOptions] = useState(0);
  const [editInfo, setEditInfo] = useState<TContent>({
    id: 0,
    info: "",
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
      {content?.map((item, i) => (
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
                        value={editInfo.info}
                        onChange={(e) => {
                          setEditInfo((prev) => ({
                            ...prev,
                            info: e.target.value,
                          }));
                        }}
                      />
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
                        style={{ backgroundColor: "#1b6794", color: "#fff" }}
                      />
                      <button
                        className="btn btn-transparent"
                        onClick={() => {
                          handleEditValue(
                            item.id,
                            editInfo.info as string,
                            editInfo.img as string,
                            editInfo.dateNTime as string
                          );
                          setEditInfo((prev) => ({ ...prev, id: 0 }));
                        }}
                        disabled={editInfo.info === ""}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-transparent text-white"
                        onClick={() => {
                          setEditInfo({
                            id: 0,
                            info: "",
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
                      <span>{item.info}</span>
                      <span>{item.img}</span>
                      <span>{item.dateNTime}</span>
                    </div>
                  )}

                  <button
                    className="btn btn-transparent z-1"
                    onClick={() =>
                      setOptions((prev) => (prev === 0 ? item.id : 0))
                    }
                  >
                    <FaEdit />
                  </button>
                  {options === item?.id && (
                    <div className="position-absolute end-0 top-100 z-5">
                      <div className="card bg-gray border-color-white">
                        <button
                          className="btn btn-transparent d-flex justify-content-start"
                          onClick={() => {
                            deleteContent(item.id);
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
                              info: item.info,
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
      ))}
    </div>
  );
};

export default CardContent;
