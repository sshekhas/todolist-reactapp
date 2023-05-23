import { Button } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import services from "../ApiService";
import { Context as DashboardContext } from "../Context/DashBoardContext";
import { Context as TaskContext } from "../Context/TaskContext";
import LayoutMenus from "../Utils/LayoutMenus";
import ModalConfirm from "../Utils/ModelConfirm";
import avatar1 from "../assets/avatar-1.jpg";

const AccountData = () => {
  const profileServices = services.profile;
  const authService = services.auth;
  const [name, setName] = useState("");
  const [totalTask, setTotalTask] = useState("");
  const [doneTask, setDoneTask] = useState("");
  const [percentageAllTasks, setPercentageAllTasks] = useState("");
  const [showModal, setIsModalShown] = useState(false);

  const { state: accountState, toggleShowAccountBar } =
    useContext(DashboardContext);

  const { state: taskState } = useContext(TaskContext);

  const navigate = useNavigate();

  useEffect(() => {
    profileServices
      .getTaskDetails()
      .then((res) => {
        setName(res.name);
        setTotalTask(res.total_task);
        setDoneTask(res.done_task);
        setPercentageAllTasks((res.done_task * 100) / res.total_task);
      })
      .catch((error) => {});
  }, [taskState]);

  const handleLogout = () => {
    authService
      .logoutUser()
      .then(() => {
        setIsModalShown(false);
        localStorage.removeItem("authToken");
        navigate({ pathname: "/login" });
      })
      .catch(() => {});
  };
  return (
    <>
      <LayoutMenus
        menuOpen={accountState.showAccountBar}
        closeMenuHandler={toggleShowAccountBar}
        className="top-0 right-0"
      >
        <section className="p-5 flex flex-col h-full">
          <span className="flex items-center mx-auto">
            <span className="font-medium">Hi, {name}!</span>
            <img src={avatar1} alt="cat" className="w-10 rounded-full ml-4" />
          </span>

          {totalTask !== 0 && (
            <div className="mt-6">
              <span className="flex justify-between mb-2">
                <span>All tasks </span> {doneTask}/{totalTask}
              </span>
              <div className="barProgress">
                <div style={{ width: percentageAllTasks + "%" }}></div>
              </div>
            </div>
          )}
          <span className="mt-6 block pt-4 border-t-slate-200 dark:border-t-slate-700/[.3] border-t-2"></span>
          <Button
            onClick={() => setIsModalShown(true)}
            className="mt-auto"
            type="primary"
            danger
          >
            Logout
          </Button>
        </section>
      </LayoutMenus>
      <div style={{ position: "fixed", top: 0, left: 0 }}>
        {showModal && (
          <ModalConfirm
            onClose={() => setIsModalShown(false)}
            text=""
            onConfirm={handleLogout}
          />
        )}
      </div>
    </>
  );
};

export default AccountData;
