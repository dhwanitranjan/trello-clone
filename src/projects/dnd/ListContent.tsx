import React, { useState } from "react";
// import CardContent from "./CardContent";
import { FaTrash } from "react-icons/fa";
import CardContent from "./CardContent";
import { useDispatch } from "react-redux";
import { addToDoItem, deleteToDoList } from "../../redux/dnd/dnd-slice";

type TLisTToDoItemsProp = {
  list: TToDos;
};

const ListContent = ({ list }: TLisTToDoItemsProp) => {
  const [createCard, setCreateCard] = useState(false);
  const [des, setDes] = useState("");
  const dispatch = useDispatch();
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center p-2">
        <div id="content">{list.title}</div>
        <br />
        <button
          className="btn btn-transparent text-danger"
          style={{ color: "red" }}
          onClick={() => dispatch(deleteToDoList(list.id))}
        >
          <FaTrash />
        </button>
      </div>
      {!!list.toDoItems?.length && (
        <CardContent id={list.id} toDoItems={list.toDoItems} />
      )}
      <div className="row">
        {!createCard ? (
          <div
            onClick={() => setCreateCard(true)}
            onBlur={() => setCreateCard(false)}
          >
            <div className="card-body" role="button">
              <h5 className="card-title">+ Add Card</h5>
            </div>
          </div>
        ) : (
          <div className="create-card w_30 mh_10">
            <input
              className="form-control text-white bg-black"
              value={des}
              onChange={(e) => {
                setDes(e.target.value);
              }}
            />
            <button
              className="btn btn-transparent text-white"
              onClick={() => {
                dispatch(addToDoItem({ des, id: list.id }));
                setCreateCard(false);
                setDes("");
              }}
              disabled={des === ""}
            >
              Save
            </button>
            <button
              className="btn btn-transparent text-white"
              onClick={() => {
                setDes("");
                setCreateCard(false);
              }}
            >
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListContent;
