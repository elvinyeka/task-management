import React, { useEffect, useState } from "react";
import { AiFillFolderOpen } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

import { useGlobalContext } from "../context/global_context";
import AddFolder from "./AddFolder";
import MenuList from "./MenuList";
import { ListBarSVG } from "./svgIcons";

interface ISidebarProps {}

const Sidebar: React.FC<ISidebarProps> = (props) => {
  const { listItems } = useGlobalContext();
  const [isActive, setIsActive] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/") {
      setIsActive(false);
    }
  }, [pathname]);

  return (
    <section className="app-sidebar">
      <ul className="app-sidebar__all-task">
        {listItems.length === 0 ? (
          <h2 className="app-sidebar__title">
            <span>Add a Folder</span>
            <AiFillFolderOpen />
          </h2>
        ) : (
          <li
            className={`app-sidebar__link ${isActive ? "active" : ""}`}
            onClick={() => setIsActive(true)}
          >
            <Link to="/">
              <ListBarSVG />
              <span>All Task</span>
            </Link>
          </li>
        )}
      </ul>
      <MenuList />
      <AddFolder />
    </section>
  );
};

export default Sidebar;
