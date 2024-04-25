import { createSlice } from "@reduxjs/toolkit";
import { dndSampleDate } from "../../constants/sampleDatas";

export interface TDndState {
  toDoLists: TToDoLists;
}

const initialState: TDndState = {
  toDoLists: [],
};

export const dndSlice = createSlice({
  name: "dnd",
  initialState,
  reducers: {
    showSampleDnD: (state, { payload }) => {
      state.toDoLists = payload ? dndSampleDate : [];
    },
    addToDoList: (state, { payload }) => {
      state.toDoLists = state.toDoLists.length
        ? [
            ...state.toDoLists,
            {
              title: payload.title,
              id: Math.random(),
            },
          ]
        : [
            {
              title: payload.title,
              id: Math.random(),
            },
          ];
    },
    deleteToDoList: (state, { payload }) => {
      state.toDoLists = state.toDoLists.filter((item) => item.id !== payload);
    },
    addToDoItem: (state, { payload }) => {
      state.toDoLists = state.toDoLists.map((item) =>
        item.id === payload.id
          ? {
              ...item,
              toDoItems: item.toDoItems
                ? [...item.toDoItems, { des: payload.des, id: Math.random() }]
                : [{ des: payload.des, id: Math.random() }],
            }
          : item
      );
    },
    deleteToDoItem: (state, { payload }) => {
      state.toDoLists = state.toDoLists.map((list) =>
        list.id === payload.listId
          ? {
              ...list,
              toDoItems: list.toDoItems?.filter(
                (toDoItem) => toDoItem.id !== payload.toDoId
              ),
            }
          : list
      );
    },
    editToDoItem: (state, { payload }) => {
      state.toDoLists = state.toDoLists.map((list) =>
        list.id === payload.listId
          ? {
              ...list,
              toDoItems: list.toDoItems?.map((item) =>
                item.id === payload.toDoId
                  ? {
                      ...item,
                      des: payload.des,
                      img: payload.img,
                      dateNTime: payload.dateNTime,
                    }
                  : item
              ),
            }
          : list
      );
    },
    modifyListsOnDragAndDrop: (state, { payload }) => {
      const source = payload.source;
      const destination = payload.destination;
      console.log({ payload });
      // dropped outside the list
      if (!destination) {
        return;
      }
      const targetItem = state.toDoLists?.find(
        (item) => item?.id == source?.droppableId
      )?.toDoItems?.[source.index];
      if (source.droppableId === destination.droppableId) {
        state.toDoLists = state.toDoLists.map((item) => {
          const itemToMove = item.toDoItems?.[source.index];
          const newArray = [...(item.toDoItems as TToDoItems[])];

          newArray.splice(source.index, 1);
          newArray.splice(destination.index, 0, itemToMove as TToDoItems);
          return item.id == destination.droppableId
            ? {
                ...item,
                toDoItems: newArray,
              }
            : item;
        });
      } else {
        state.toDoLists = state.toDoLists.map((item) => {
          const tempArr = item.toDoItems ? [...item.toDoItems] : [];
          tempArr.splice(destination.index, 0, targetItem as TToDoItems);
          return item.id == destination.droppableId
            ? {
                ...item,
                toDoItems: tempArr,
              }
            : item;
        });
        state.toDoLists = state.toDoLists.map((item) => {
          const tempArr = item.toDoItems ? [...item.toDoItems] : [];
          tempArr.splice(source.index, 1);
          return item.id == source.droppableId
            ? {
                ...item,
                toDoItems: tempArr,
              }
            : item;
        });
      }
    },
  },
});

export const {
  showSampleDnD,
  addToDoList,
  addToDoItem,
  deleteToDoList,
  deleteToDoItem,
  editToDoItem,
  modifyListsOnDragAndDrop,
} = dndSlice.actions;

export default dndSlice.reducer;
