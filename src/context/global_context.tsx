import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContextType, IMenuColors, IMenuItems } from "../types/data";
import { useLocation, useNavigate } from "react-router-dom";

const url = "http://localhost:3001";

const contextDefaultValues: AppContextType = {
  listItems: [],
  colors: [],
  showAdd: false,
  showEdit: false,
  isLoading: false,
  activeItem: {
    id: 0,
    color: "",
    name: "",
    isActive: false,
    todos: [],
  },
  activeColor: "",
  inputFolderName: "",
  onColorHandle: (hex: string) => {},
  onCloseAddFolder: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {},
  setShowAdd: (showAdd: boolean) => {},
  setListItems: (listItems: IMenuItems[]) => {},
  setShowEdit: (showEdit: boolean) => {},
  setActiveItem: (activeItem: IMenuItems) => {},
  onDeleteListItem: (id: number) => {},
  onListActive: (id: number) => {},
  onChangeTitle: (id: number | undefined, title: string | undefined) => {},
  onAddTask: (id: number | undefined, title: string) => {},
  onRemoveTask: (taskId: number, listId: number) => {},
  setInputFolderName: (inputFolderName: string) => {},
  addFolderSubmit: (e: React.FormEvent<HTMLFormElement>) => {},
  onEditTask: (taskId: number, listId: number, title: string) => {},
  onCompletedTask: (taskId: number, listId: number, completed: boolean) => {},
};
interface AppProviderProps {
  children: React.ReactNode;
}

const AppContext = createContext<AppContextType>(contextDefaultValues);

const AppProvider = ({ children }: AppProviderProps) => {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [listItems, setListItems] = useState<IMenuItems[]>([]);
  const [activeItem, setActiveItem] = useState<IMenuItems>({
    id: 0,
    color: "",
    name: "",
    isActive: false,
    todos: [],
  });
  const [activeColor, setActiveColor] = useState<string>("");
  const [colors, setColors] = useState<IMenuColors[]>([]);
  const [inputFolderName, setInputFolderName] = useState<string>("");
  const { pathname } = useLocation();
  let navigate = useNavigate();

  const onCloseAddFolder = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setInputFolderName("");
    setActiveColor("");
    setShowAdd(!showAdd);
  };
  const onColorHandle = (hex: string) => {
    setActiveColor(hex);
  };
  const addFolderSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    if (!inputFolderName || !activeColor) {
      alert("Please choose color and write folder name");
      return;
    }
    try {
      const { data } = await axios.post(`${url}/lists`, {
        color: activeColor,
        name: inputFolderName,
        isActive: false,
      });
      setListItems([...listItems, data]);
      setInputFolderName("");
      setActiveColor("");
      setShowAdd(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const onDeleteListItem = async (id: number) => {
    if (confirm("The folder will be deleted. Are you sure?")) {
      await axios.delete(`${url}/lists/${id}`).then(() => {
        const newListItems = listItems.filter((item) => item.id !== id);
        setListItems(newListItems);
        navigate("/");
      });
    }
  };
  const onListActive = (id: number) => {
    setListItems((listItems) =>
      listItems.map((item) => ({ ...item, isActive: item.id === id }))
    );
    const item = listItems.filter((item) => item.id === id);
    setActiveItem(item[0]);
  };

  const onChangeTitle = async (
    id: number | undefined,
    title: string | undefined
  ) => {
    try {
      setShowEdit(!showEdit);
      const item = listItems.find((item) => item.id === id);
      const newItem = { ...(item as IMenuItems), name: title };
      const newList = listItems.map((item) => {
        if (item.id === id) {
          item.name = title;
        }
        return item;
      });
      setListItems(newList);
      setActiveItem(newItem);
      await axios.patch(`${url}/lists/${id}`, { name: title });
    } catch (error) {
      console.log(error);
    }
  };

  const onAddTask = async (id: number | undefined, title: string) => {
    setIsLoading(true);
    try {
      const newTaskObj = {
        id: Math.random(),
        listId: id,
        title: title,
        completed: false,
      };
      await axios.post(`${url}/todos`, newTaskObj).then(() => {
        const newList = listItems.map((item) => {
          if (item.id === id) {
            if (item.todos) {
              item.todos = [...(item.todos as any[]), newTaskObj];
            } else {
              item.todos = [newTaskObj];
            }
          }
          return item;
        });
        setListItems(newList);
        const item = listItems.find((item) => item.id === id);
        const newItem = {
          ...(item as IMenuItems),
        };
        setActiveItem(newItem);
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onEditTask = async (taskId: number, listId: number, title: string) => {
    try {
      const newList = listItems.map((item) => {
        if (item.id === listId) {
          if (item.todos) {
            item.todos = item.todos.map((task) => {
              if (task.id === taskId) {
                task.title = title;
              }
              return task;
            });
          }
        }
        return item;
      });
      setListItems(newList);
      const item = listItems.find((item) => item.id === listId);
      const newItem = {
        ...(item as IMenuItems),
      };
      setActiveItem(newItem);
      await axios.patch(`${url}/todos/${taskId}`, { title: title });
    } catch (error) {
      console.log(error);
    }
  };

  const onCompletedTask = async (
    taskId: number,
    listId: number,
    completed: boolean
  ) => {
    try {
      const newList = listItems.map((item) => {
        if (item.id === listId) {
          if (item.todos) {
            item.todos = item.todos.map((task) => {
              if (task.id === taskId) {
                task.completed = completed;
              }
              return task;
            });
          }
        }
        return item;
      });
      setListItems(newList);
      const item = listItems.find((item) => item.id === listId);
      const newItem = {
        ...(item as IMenuItems),
      };
      setActiveItem(newItem);
      await axios.patch(`${url}/todos/${taskId}`, { completed: completed });
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveTask = async (taskId: number, listId: number) => {
    if (window.confirm("Are you shure to delete task?")) {
      try {
        await axios.delete(`${url}/todos/${taskId}`).then(() => {
          const newList = listItems.map((item) => {
            if (item.id === listId) {
              if (item.todos) {
                item.todos = item.todos.filter((task) => task.id !== taskId);
              }
            }
            return item;
          });
          setListItems(newList);
          const item = listItems.find((item) => item.id === listId);
          const newItem = {
            ...(item as IMenuItems),
          };
          setActiveItem(newItem);
        });
        console.log(taskId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchLists = async () => {
    try {
      const { data } = await axios(`${url}/lists?_embed=todos`);
      setListItems(data);
    } catch (error) {
      console.warn(error);
    }
  };
  const fetchColors = async () => {
    try {
      const { data } = await axios(`${url}/colors`);
      setColors(data);
      setActiveColor(data[0]);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetchLists();
    fetchColors();
  }, []);

  useEffect(() => {
    const listId = +pathname.split("list/")[1];
    if (listItems && !Number.isNaN(listId)) {
      const list = listItems.find((list) => list.id === listId);
      if (list !== undefined) {
        setActiveItem(list as IMenuItems);
      }
    }
  }, [listItems, pathname]);

  return (
    <AppContext.Provider
      value={{
        listItems,
        setListItems,
        showAdd,
        setShowAdd,
        addFolderSubmit,
        activeColor,
        onColorHandle,
        inputFolderName,
        setInputFolderName,
        onCloseAddFolder,
        onDeleteListItem,
        onListActive,
        colors,
        isLoading,
        activeItem,
        setActiveItem,
        showEdit,
        setShowEdit,
        onChangeTitle,
        onAddTask,
        onRemoveTask,
        onEditTask,
        onCompletedTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
