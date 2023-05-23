import { default as React } from "react";
import ActionsTaskItem from "./ActionsTaskItem";
import InfosTask from "./TaskInfo";

const TaskItem = ({ task }) => {
  return (
    <>
      <li key={task.url}>
        <div
          className={
            "bg-slate-100 rounded-lg p-3 sm:p-4 flex text-left transition hover:shadow-lg hover:shadow-slate-300 dark:bg-slate-800 dark:hover:shadow-transparent flex-row sm:h-32"
          }
        >
          <InfosTask task={task} />
          <ActionsTaskItem task={task} />
        </div>
      </li>
    </>
  );
};

export default TaskItem;
