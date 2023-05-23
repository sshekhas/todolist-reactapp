import { default as React } from "react";

import BtnDeleteTask from "../TaskButtons/BtnDeleteTask";
import BtnEditTask from "../TaskButtons/BtnEditTask";
import BtnMarkAsImportant from "../TaskButtons/BtnMarkAsImp";
import BtnToggleCompleted from "../TaskButtons/BtnToggleCompleted";

const ActionsTaskItem = ({ task }) => {
  return (
    <>
      <div
        className={
          "flex border-dashed border-slate-200 dark:border-slate-700/[.3] items-center"
        }
      >
        <BtnToggleCompleted task={task} />
        <BtnMarkAsImportant task={task} />
        <BtnDeleteTask task={task} />
        <BtnEditTask task={task} />
      </div>
    </>
  );
};

export default ActionsTaskItem;
