import React, { useState } from "react";
import { useGlobalContext } from "../context/global_context";
import { ITodo } from "../types/data";
import { CheckSVG, DeleteSVG, EditSVG } from "./svgIcons";

interface ITaskItemProps extends ITodo {
  listId: number;
  withoutEmpty: boolean;
}

const TaskItem: React.FC<ITaskItemProps> = ({
  title,
  id,
  withoutEmpty,
  listId,
  completed,
}) => {
  const { onRemoveTask, onEditTask, onCompletedTask } = useGlobalContext();
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>(title);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskTitle) {
      onEditTask(id as number, listId, taskTitle);
      setShowEdit(false);
    }
  };

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCompletedTask(id as number, listId, e.target.checked);
    console.log(e.target.checked);
  };

  return (
    <div className="tasks__item">
      {!withoutEmpty && (
        <>
          <input
            type="checkbox"
            id={`${id}`}
            checked={completed}
            onChange={(e) => onChangeCheckbox(e)}
          />
          <label className="tasks__item-checkbox" htmlFor={`${id}`}>
            <CheckSVG />
          </label>
        </>
      )}
      <form onSubmit={(e) => onSubmitForm(e)}>
        <input
          className={`tasks__item-input ${showEdit ? "active" : ""}`}
          type="text"
          readOnly={!showEdit}
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </form>
      {!withoutEmpty && (
        <div className="tasks__item-btns">
          <button type="button" onClick={() => setShowEdit(!showEdit)}>
            <EditSVG />
          </button>
          <button
            type="button"
            onClick={() => onRemoveTask(id as number, listId)}
          >
            <DeleteSVG />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
