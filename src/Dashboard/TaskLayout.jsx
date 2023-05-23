import React, { useContext, useEffect } from "react";
import services from "../ApiService";
import { Context as TaskContext } from "../Context/TaskContext";
import TaskItem from "./TaskItem";

const LayoutRoutes = ({ title, queryParam }) => {
  const { state: task, overRideTask } = useContext(TaskContext);

  const profileServices = services.profile;

  useEffect(() => {
    profileServices
      .getdoTo({ query: queryParam })
      .then((res) => {
        overRideTask(res.results);
      })
      .catch(() => {});
  }, [queryParam]);

  const tasksTitle = `${title}`;

  return (
    <section>
      <h1 className="font-medium my-5 text-center sm:text-left sm:my-8 md:text-2xl text-lg dark:text-slate-200">
        {tasksTitle}
      </h1>
      <ul className={`tasksList mt-4 grid gap-2 sm:gap-4 xl:gap-6 grid-cols-1`}>
        {task && task.map((task) => <TaskItem key={task.url} task={task} />)}
        <li></li>
      </ul>
    </section>
  );
};

export default React.memo(LayoutRoutes);
