import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Context as DashboardContext } from "../Context/DashBoardContext";
import LayoutMenus from "../Utils/LayoutMenus";

const classLinkActive =
  "text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200";

const links = [
  {
    name: "Today's tasks",
    path: "/today",
  },
  {
    name: "All tasks",
    path: "/",
  },
  {
    name: "Important tasks",
    path: "/important",
  },
  {
    name: "Completed tasks",
    path: "/completed",
  },
  {
    name: "Uncompleted tasks",
    path: "/uncompleted",
  },
];
const Menu = () => {
  const route = useLocation();
  const currentPath = route.pathname;
  const { state: menuState, toggleShowMenuBar } = useContext(DashboardContext);
  return (
    <LayoutMenus
      menuOpen={menuState.showMenuBar}
      closeMenuHandler={toggleShowMenuBar}
      className="left-0"
    >
      <header className="h-full flex flex-col">
        <h1 className="font-bold uppercase text-center mt-8 text-lg tracking-wide hidden xl:block">
          To-do list
        </h1>
        <nav>
          <ul className="grid gap-2">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={`px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200 ${
                    currentPath === link.path ? classLinkActive : ""
                  }`}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </LayoutMenus>
  );
};

export default Menu;
