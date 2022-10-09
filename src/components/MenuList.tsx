import React, { useEffect } from "react";
import { AiFillFolder } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context/global_context";
import { DeleteSVG } from "./svgIcons";

interface IMenuListProps {}

const MenuList: React.FC<IMenuListProps> = () => {
  const { listItems, onDeleteListItem, onListActive, activeItem } =
    useGlobalContext();
  const { pathname } = useLocation();

  return (
    <ul className="app-sidebar__category">
      {listItems.map((item) => {
        return (
          <li
            key={item.id}
            className={`${
              pathname !== "/" && item.id === activeItem.id ? "active" : ""
            }`}
            onClick={() => onListActive(item.id)}
          >
            <Link to={`/list/${item.id}`}>
              <AiFillFolder style={{ color: item.color }} />
              <div className="category__item-content">
                <span>{item.name}</span>
                <strong>
                  {item.todos &&
                    item.todos.length > 0 &&
                    `(${item.todos.length})`}
                </strong>
                <button onClick={() => onDeleteListItem(item.id)}>
                  <DeleteSVG />
                </button>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MenuList;
