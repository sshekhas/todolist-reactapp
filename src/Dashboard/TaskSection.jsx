import React from "react";
import { Outlet } from "react-router-dom";
import HeaderTasks from "./HeaderTasks";

const TasksSection = () => {
  return (
    <div className=" pt-5 pb-8 sm:pb-16 px-3 md:px-8 md:w-full xl:w-8/12 m-auto min-h-screen">
      <HeaderTasks />
      <Outlet />
    </div>
  );
};

export default TasksSection;
