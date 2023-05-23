import { default as React, useContext, useState } from "react";
import services from "../ApiService";
import { Context as TaskContext } from "../Context/TaskContext";
import ModalCreateTask from "../Utils/ModelTask";
import { ReactComponent as OptionsSvg } from "../assets/options.svg";
import { useLocation } from "react-router-dom";

const BtnEditTask = ({ task }) => {
  const [modalEditTaskOpen, setModalEditTaskOpen] = useState(false);
  const route = useLocation();
  const currentPath = route.pathname;

  const closeModalEditTask = () => {
    setModalEditTaskOpen(false);
  };

  const openModalEditTask = () => {
    setModalEditTaskOpen(true);
  };

  const editTaskHandler = (task) => {
    profileServices
      .patch(task.url, task)
      .then((res) => {
        editTask(res, currentPath);
      })
      .catch(() => {});
  };
  const profileServices = services.profile;

  const { editTask } = useContext(TaskContext);
  return (
    <>
      <button
        title="edit task"
        className="transition w-7 sm:w-8 h-6 sm:h-8 grid place-items-center dark:hover:text-slate-200 hover:text-slate-700"
        onClick={openModalEditTask}
      >
        <OptionsSvg className="w-4 sm:w-5 h-4 sm:h-5" />
      </button>
      <div style={{ position: "fixed", top: 0, left: 0 }}>
        {modalEditTaskOpen ? (
          <ModalCreateTask
            onClose={closeModalEditTask}
            task={task}
            nameForm="Edit task"
            onConfirm={editTaskHandler}
          />
        ) : null}
      </div>
    </>
  );
};

export default BtnEditTask;
