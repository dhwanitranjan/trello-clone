import React, { useState } from "react";
import ListContent from "./ListContent";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const DnD = () => {
  const [lists, setLists] = useState<TDnDList>([]);
  const [create, setCreate] = useState(false);
  const [fieldValues, setFieldValues] = useState({
    title: "",
    dateNTime: null,
  });

  const deleteList = (id: number) => {
    setLists((prev) => prev.filter((item) => item.id !== id));
  };
  const addContentData = (info: string, id: number) => {
    setLists((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              content: item.content
                ? [...item.content, { info: info, id: Math.random() }]
                : [{ info: info, id: Math.random() }],
            }
          : item
      )
    );
  };

  const deleteContent = (listId: number, id: number) => {
    setLists((prev) =>
      prev.map((list) => {
        return list.id === listId
          ? {
              ...list,
              content: list.content?.filter((content) => content.id !== id),
            }
          : list;
      })
    );
  };

  const handleEditContent = (
    listId: number,
    id: number,
    value: string,
    img: string,
    dateNTime: string
  ) => {
    setLists((prev) =>
      prev.map((list) => {
        return list.id === listId
          ? {
              ...list,
              content: list.content?.map((content) =>
                content.id === id
                  ? {
                      ...content,
                      info: value,
                      img: img,
                      dateNTime: dateNTime,
                    }
                  : content
              ),
            }
          : list;
      })
    );
  };

  const onDragEnd = (result: { source: any; destination: any }) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    const targetItem = lists?.find((item) => item?.id == source?.droppableId)
      ?.content?.[source.index];
    if (source.droppableId === destination.droppableId) {
      setLists((prev) =>
        prev.map((item) => {
          const itemToMove = item.content?.[source.index];
          const newArray = [...(item.content as TContent[])];

          newArray.splice(source.index, 1);
          newArray.splice(destination.index, 0, itemToMove as TContent);
          return item.id == destination.droppableId
            ? {
                ...item,
                content: newArray,
              }
            : item;
        })
      );
    } else {
      setLists((prev) =>
        prev.map((item) => {
          const tempArr = item.content ? [...item.content] : [];
          tempArr.splice(destination.index, 0, targetItem as TContent);
          return item.id == destination.droppableId
            ? {
                ...item,
                content: tempArr,
              }
            : item;
        })
      );
      setLists((prev) =>
        prev.map((item) => {
          const tempArr = item.content ? [...item.content] : [];
          tempArr.splice(source.index, 1);
          return item.id == source.droppableId
            ? {
                ...item,
                content: tempArr,
              }
            : item;
        })
      );
    }
  };
  const grid = 8;
  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "#101204",
    padding: grid,
    width: 250,
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="h-100">
        <div style={{ backgroundColor: "#005485" }}>
          <div className="row">
            {lists?.map((list, i) => {
              return (
                <div className="col-4" key={i}>
                  <Droppable droppableId={`${list.id}`}>
                    {(provided, snapshot) => (
                      <div
                        className="card m-2 text-white w-100"
                        style={getListStyle(snapshot.isDraggingOver)}
                        ref={provided.innerRef}
                      >
                        <div
                          style={{
                            backgroundColor: "#101204",
                          }}
                        >
                          <ListContent
                            list={list}
                            handleContentData={(cardInfo: string, id: number) =>
                              addContentData(cardInfo, id)
                            }
                            handleListDelete={(id: number) => deleteList(id)}
                            deleteContent={(listId: number, id: number) =>
                              deleteContent(listId, id)
                            }
                            handleEditContent={handleEditContent}
                          />
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
            <div className="col-4">
              <div className=" m-2 p-1">
                {!create ? (
                  <div
                    className="card"
                    onClick={() => setCreate(true)}
                    onBlur={() => setCreate(false)}
                    style={{ backgroundColor: "#1b6794", color: "#fff" }}
                  >
                    <div className="card-body" role="button">
                      <h5 className="card-title">+ Add List</h5>
                    </div>
                  </div>
                ) : (
                  <div className="card" style={{ backgroundColor: "#1b6794" }}>
                    <div className="d-flex">
                      <input
                        className="form-control"
                        value={fieldValues.title}
                        type="text"
                        onChange={(e) => {
                          setFieldValues((prev) => ({
                            ...prev,
                            title: e.target.value as string,
                          }));
                        }}
                        style={{ backgroundColor: "#1b6794", color: "#fff" }}
                      />
                    </div>
                    <div className="d-flex justify-content-end m-1">
                      <button
                        className="btn btn-transparent"
                        onClick={() => {
                          //   setLists((prev) =>
                          //     prev
                          //       ? [
                          //           ...prev,
                          //           {
                          //             title: fieldValues.title,
                          //             id: Math.random(),
                          //           },
                          //         ]
                          //       : [{ title: fieldValues.title }]
                          //   );
                          setLists((prev) =>
                            prev
                              ? [
                                  ...prev,
                                  {
                                    title: fieldValues.title,
                                    id: Math.random(),
                                  },
                                ]
                              : [
                                  {
                                    title: fieldValues.title,
                                    id: Math.random(),
                                  },
                                ]
                          );
                          setCreate(false);
                          setFieldValues((prev) => ({ ...prev, title: "" }));
                        }}
                        disabled={fieldValues.title === ""}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-transparent"
                        onClick={() => {
                          setCreate(false);
                          setFieldValues((prev) => ({ ...prev, title: "" }));
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default DnD;
