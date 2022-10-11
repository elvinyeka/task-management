import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../context/global_context";
import { AiFillFolder } from "react-icons/ai";
import { DeleteCircleSVG, PlusSVG } from "./svgIcons";
import Loader from "./Loader";

interface IAddFolderProps {}

const AddFolder: React.FC<IAddFolderProps> = (props) => {
  const {
    showAdd,
    setShowAdd,
    addFolderSubmit,
    activeColor,
    onColorHandle,
    inputFolderName,
    setInputFolderName,
    onCloseAddFolder,
    colors,
    isLoading,
  } = useGlobalContext();
  const focusInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    focusInputRef.current?.focus();
  }, [showAdd]);

  return (
    <div className="app-sidebar__add">
      <button
        className="app-sidebar__add-btn"
        onClick={() => setShowAdd(!showAdd)}
      >
        <PlusSVG />
        <span>Add Folder</span>
      </button>
      {showAdd && (
        <form
          className="app-sidebar__add-form"
          onSubmit={(e) => addFolderSubmit(e)}
        >
          <button
            className="add-form__icon"
            onClick={(e) => onCloseAddFolder(e)}
          >
            <DeleteCircleSVG />
          </button>
          <input
            className="add-form__input"
            type="text"
            placeholder="Folder Name"
            ref={focusInputRef}
            value={inputFolderName}
            onChange={(e) => setInputFolderName(e.target.value)}
          />
          <ul className="add-form__colors">
            {colors.map((color) => {
              return (
                <li key={color.id}>
                  <AiFillFolder
                    className={`add-form__color ${
                      activeColor === color.hex && "active"
                    }`}
                    style={{ color: color.hex }}
                    onClick={() => onColorHandle(color.hex)}
                  />
                </li>
              );
            })}
          </ul>
          <button className="add-form__btn" type="submit">
            {isLoading ? <Loader /> : "Add Folder"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddFolder;
