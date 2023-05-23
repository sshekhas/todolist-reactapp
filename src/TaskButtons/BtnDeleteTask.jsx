import React, { useContext, useState } from "react";
import services from "../ApiService";
import { Context as TaskContext } from "../Context/TaskContext";
import ModalConfirm from "../Utils/ModelConfirm";
import { ReactComponent as Trash } from "../assets/trash.svg";

const BtnDeleteTask = ({ task }) => {
  const profileServices = services.profile;
  const [showModal, setIsModalShown] = useState(false);
  const { deleteTask } = useContext(TaskContext);

  const removeTaskHandler = () => {
    profileServices
      .deleteTodo(task.url)
      .then((res) => {
        setIsModalShown(false);
        deleteTask(task);
      })
      .catch(() => {});
  };
  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0 }}>
        {showModal && (
          <ModalConfirm
            onClose={() => setIsModalShown(false)}
            text="This task will be deleted permanently."
            onConfirm={removeTaskHandler}
          />
        )}
      </div>
      <button
        onClick={() => setIsModalShown(true)}
        title="delete task"
        className="ml-2 transition hover:text-slate-700 dark:hover:text-slate-200"
      >
        <Trash className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </>
  );
};

export default React.memo(BtnDeleteTask);
