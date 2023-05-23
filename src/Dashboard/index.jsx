import { useContext } from "react";
import services from "../ApiService";
import { Context as DashboardContext } from "../Context/DashBoardContext";
import { Context as TaskContext } from "../Context/TaskContext";
import AccountData from "./AccountData";
import Menu from "./Menu";
import TasksSection from "./TaskSection";

import { useLocation } from "react-router-dom";
import ModalCreateTask from "../Utils/ModelTask";

const Dashboard2 = () => {
  const profileServices = services.profile;
  const { state, toggleShowAddNewTask } = useContext(DashboardContext);
  const { addTask } = useContext(TaskContext);
  const route = useLocation();
  const currentPath = route.pathname;

  const addTaskHandler = (task) => {
    profileServices
      .postTodo(task)
      .then((res) => {
        addTask(res, currentPath);
      })
      .catch(() => {});
  };

  return (
    <div className="bg-slate-200 min-h-screen text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm text-xs">
      {state.showAddNewTask && (
        <ModalCreateTask
          onClose={toggleShowAddNewTask}
          nameForm="Add a task"
          onConfirm={addTaskHandler}
        />
      )}
      <Menu />
      <TasksSection />
      <AccountData />
    </div>
  );
};

export default Dashboard2;
