import React, { useContext } from "react";
import services from "../ApiService";
import { Context as TaskContext } from "../Context/TaskContext";
import { ReactComponent as Check } from "../assets/check.svg";
import { ReactComponent as SvgX } from "../assets/x.svg";

const BtnToggleCompleted = ({ task }) => {
  const profileServices = services.profile;
  const { editTask } = useContext(TaskContext);

  const toggleTaskCompleted = () => {
    task.is_done = !task.is_done;
    profileServices
      .patch(task.url, task)
      .then((res) => {
        editTask(res);
      })
      .catch(() => {});
  };

  return (
    <button
      title={task.is_done ? "mark as uncompleted" : "mark as completed"}
      className={`${
        task.is_done
          ? "bg-emerald-200 text-emerald-800 "
          : "bg-amber-200 text-amber-800 "
      } mr-4 rounded-full font-medium`}
      onClick={() => toggleTaskCompleted()}
    >
      <span className="block py-1 px-3 absolute invisible sm:static sm:visible">
        {task.is_done ? "completed" : "uncompleted"}
      </span>
      <span className=" sm:hidden w-6 h-6 grid place-items-center">
        {task.is_done ? (
          <Check className="w-3 h-3" />
        ) : (
          <SvgX className="w-3 h-3" />
        )}
      </span>
    </button>
  );
};

export default BtnToggleCompleted;
