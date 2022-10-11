export interface IMenuItems {
  id: number;
  color?: string;
  name?: string;
  isActive?: boolean;
  todos: ITodo[];
}
export interface IMenuColors {
  id: number;
  hex: string;
}

export interface ITodo {
  id?: number | undefined;
  title: string;
  listId: number | undefined;
  completed: boolean;
}
export type AppContextType = {
  listItems: IMenuItems[];
  colors: IMenuColors[];
  showAdd: boolean;
  showEdit: boolean;
  isLoading: boolean;
  activeItem: IMenuItems;
  activeColor: string;
  inputFolderName: string;
  setShowAdd: (showAdd: boolean) => void;
  setShowEdit: (showEdit: boolean) => void;
  setListItems: (listItems: IMenuItems[]) => void;
  setInputFolderName: (inputFolderName: string) => void;
  setActiveItem: (activeItem: IMenuItems) => void;
  addFolderSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onColorHandle: (hex: string) => void;
  onCloseAddFolder: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onDeleteListItem: (id: number) => void;
  onListActive: (id: number) => void;
  onChangeTitle: (id: number | undefined, title: string | undefined) => void;
  onAddTask: (id: number | undefined, title: string) => void;
  onRemoveTask: (taskId: number, listId: number) => void;
  onEditTask: (taskId: number, listId: number, title: string) => void;
  onCompletedTask: (taskId: number, listId: number, completed: boolean) => void;
};
