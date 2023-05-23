import React, { useContext } from "react";
import { Context as DashboardContext } from "../Context/DashBoardContext";
import avatar1 from "../assets/avatar-1.jpg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
const HeaderTasks = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const { toggleShowAddNewTask, toggleShowMenuBar, toggleShowAccountBar } =
    useContext(DashboardContext);

  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const todayDate = `${day.toString().padStart(2, "0")} ${monthName[
    month
  ].slice(0, 3)}, ${year}`;

  const dateTimeFormat = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}}`;

  return (
    <header className="items-center grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 md:flex ">
      <button
        className="mr-6 block xl:hidden"
        onClick={toggleShowMenuBar}
        title="open menu"
      >
        <MenuIcon />
      </button>
      <div className="flex-1 col-span-3 row-start-2 md:pr-10">
        <time dateTime={dateTimeFormat}>{todayDate}</time>
      </div>
      <div className="text-center">
        <span className="text-slate-600 dark:text-slate-200 uppercase font-bold text-sm block xl:hidden">
          To-do list
        </span>
      </div>
      <div className="flex flex-1">
        <div className=" ml-auto"></div>
        <button
          className={`btn  sm:static fixed bottom-3 right-3 z-10 sm:z-0 min-w-max shadow-lg shadow-slate-400  dark:shadow-slate-900 sm:shadow-transparent`}
          onClick={toggleShowAddNewTask}
        >
          Add new task
        </button>
        <button onClick={toggleShowAccountBar} className="block xl:hidden">
          <img
            src={avatar1}
            alt="cat"
            className="w-10 h-10 rounded-full ml-4"
          />
        </button>
      </div>
    </header>
  );
};

export default HeaderTasks;
