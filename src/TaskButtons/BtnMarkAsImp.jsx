import React, { useContext } from "react";
import services from "../ApiService";
import { Context as TaskContext } from "../Context/TaskContext";
import { ReactComponent as StarLine } from "../assets/star-line.svg";

const BtnMarkAsImportant = ({ task }) => {
  const profileServices = services.profile;
  const { editTask } = useContext(TaskContext);

  const markAsImportantHandler = () => {
    task.is_urgent = !task.is_urgent;
    profileServices
      .patch(task.url, task)
      .then((res) => {
        editTask(res);
      })
      .catch(() => {});
  };

  return (
    <button
      title={task.is_urgent ? "unmark as important" : "mark as important"}
      onClick={markAsImportantHandler}
      className="transition hover:text-slate-700 dark:hover:text-slate-200 ml-auto"
    >
      <StarLine
        className={`w-5 h-5 sm:w-6 sm:h-6 ${
          task.is_urgent ? "fill-rose-500 stroke-rose-500 " : "fill-none"
        }`}
      />
    </button>
  );
};

export default BtnMarkAsImportant;
