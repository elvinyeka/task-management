import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../context/global_context";
import { IMenuItems } from "../types/data";

import { PlusSVG } from "./svgIcons";

interface IAddTaskProps {
  list: IMenuItems;
}

const AddTask: React.FC<IAddTaskProps> = ({ list }) => {
  const { onAddTask, isLoading } = useGlobalContext();
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const focusInputRef = useRef<HTMLInputElement | null>(null);

  const onToggleForm = () => {
    setShowAddForm(!showAddForm);
    setNewTaskValue("");
  };

  const onTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (list && newTaskValue) {
      onAddTask(list.id, newTaskValue);
    }
    onToggleForm();
  };

  useEffect(() => {
    focusInputRef.current?.focus();
  }, [showAddForm]);

  return (
    <>
      {showAddForm ? (
        <form onSubmit={(e) => onTaskSubmit(e)} className="add__form">
          <input
            className="add__form-input"
            type="text"
            placeholder="Task Content"
            ref={focusInputRef}
            value={newTaskValue}
            onChange={(e) => setNewTaskValue(e.target.value)}
          />
          <div className="add__form-btns">
            <button
              disabled={newTaskValue.length === 0 && true}
              className="add__form-btn add__form-btn--green"
              type="submit"
            >
              {isLoading ? <span>Adding...</span> : <span>Add task</span>}
            </button>
            <button className="add__form-btn" onClick={onToggleForm}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="add__box">
          <button className="add__box-btn" onClick={onToggleForm}>
            <PlusSVG />
            <span className="add__box-title">Add task</span>
          </button>
        </div>
      )}
    </>
  );
};

export default AddTask;
