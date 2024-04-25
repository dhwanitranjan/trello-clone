import React, { useEffect, useState } from "react";
import ListContent from "./ListContent";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  addToDoList,
  modifyListsOnDragAndDrop,
  showSampleDnD,
} from "../../redux/dnd/dnd-slice";

const DnD = () => {
  const todoLists = useSelector((state: RootState) => state.dnd.toDoLists);
  const showSampleData = useSelector(
    (state: RootState) => state.global.sampleData
  );
  const dispatch = useDispatch();
  const [create, setCreate] = useState(false);
  const [fieldValues, setFieldValues] = useState({
    title: "",
    dateNTime: null,
  });

  useEffect(() => {
    dispatch(showSampleDnD(showSampleData));
  }, [showSampleData]);

  const onDragEnd = (result: { source: any; destination: any }) => {
    const { source, destination } = result;
    dispatch(modifyListsOnDragAndDrop({ source, destination }));
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
            {todoLists?.map((list, i) => {
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
                          <ListContent list={list} />
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
                          dispatch(addToDoList({ title: fieldValues.title }));
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
