import React, { useEffect, useRef, useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";

import TaskItem from "./TaskItem";
import { EditSVG } from "./svgIcons";
import { IMenuItems } from "../types/data";
import { useGlobalContext } from "../context/global_context";
import AddTask from "./AddTask";
import { Link } from "react-router-dom";

interface ITasksProps {
  list: IMenuItems;
  withoutEmpty: boolean;
}

const Tasks: React.FC<ITasksProps> = ({ list, withoutEmpty }) => {
  const { showEdit, onChangeTitle, setShowEdit } = useGlobalContext();
  const [newTitle, setNewTitle] = useState<string | undefined>("");
  const [itemId, setItemId] = useState<number | undefined>(0);
  const focusInputRef = useRef<HTMLInputElement | null>(null);

  const onEditClick = (id: number | undefined) => {
    setShowEdit(!showEdit);
    setItemId(id);
  };
  const onEditTitleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChangeTitle(itemId, newTitle);
    setShowEdit(false);
  };
  useEffect(() => {
    setNewTitle(list.name);
    focusInputRef.current?.focus();
  }, [showEdit]);

  return (
    <div className="tasks__wrapper">
      <h2 className="tasks__title">
        {showEdit ? (
          <form onSubmit={(e) => onEditTitleForm(e)}>
            <input
              className="tasks__title-input"
              type="text"
              ref={focusInputRef}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </form>
        ) : (
          <>
            {list && (
              <>
                {withoutEmpty ? (
                  <Link to={`/list/${list.id}`}>
                    <span style={{ color: list.color }}>
                      {list.name && list.name}
                    </span>
                  </Link>
                ) : (
                  <span style={{ color: list.color }}>
                    {list.name && list.name}
                  </span>
                )}
              </>
            )}
          </>
        )}
        {!withoutEmpty && (
          <button onClick={() => onEditClick(list.id)}>
            <EditSVG />
          </button>
        )}
      </h2>
      <div className="tasks__items">
        {list && list.todos && list.todos.length > 0 ? (
          list.todos.map((todo) => {
            return (
              <TaskItem
                {...todo}
                key={todo.id}
                listId={list.id}
                withoutEmpty={withoutEmpty}
              />
            );
          })
        ) : (
          <>
            {!withoutEmpty && (
              <h2 className="tasks__items-placeholder">
                <MdPlaylistAdd />
                <span>Create a task</span>
              </h2>
            )}
          </>
        )}
      </div>
      {!withoutEmpty && (
        <div className="tasks__add-form">
          <AddTask key={list.id} list={list} />
        </div>
      )}
    </div>
  );
};

export default Tasks;
