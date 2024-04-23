type TContent = {
  id: number;
  info?: string;
  img?: string;
  dateNTime?: string;
};
type TDnDElement = {
  id: number;
  title: string;
  content?: TContent[];
};
type TDnDList = TDnDElement[];

type TListContentProp = {
  list: TDnDElement;
  handleContentData: (val, id) => void;
  handleListDelete: (val) => void;
  deleteContent: (listId: number, id: number) => void;
  handleEditContent: (
    listId: number,
    id: number,
    value: string,
    img: string,
    dateNTime: string
  ) => void;
};

type TCardContentProp = {
  content: TContent[];
  deleteContent: (val: number) => void;
  handleEditValue: (
    id: number,
    title: string,
    img: string,
    dateNTime: string
  ) => void;
};
