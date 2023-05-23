import "antd/dist/reset.css";
import Dashboard2 from "./Dashboard";

import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import TaskLayout from "./Dashboard/TaskLayout";
import LoginForm from "./Login";

function App() {
  //for auth token check here

  const { pathname } = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("authToken");

    if (token) {
      navigate({ pathname: pathname.includes("login") ? "/" : pathname });
    } else navigate({ pathname: "login" });
  }, []);
  return (
    <Routes>
      <Route path="login" element={<LoginForm />} />
      <Route path="/*" element={<Dashboard2 />}>
        <Route
          index
          element={<TaskLayout title={"All Tasks"} queryParam={{}} />}
        />
        <Route
          path="today"
          element={
            <TaskLayout
              title={"Today's Tasks"}
              queryParam={{ date: new Date().toLocaleDateString("en-GB") }}
            />
          }
        />
        <Route
          path="important"
          element={
            <TaskLayout
              title={"Important's Tasks"}
              queryParam={{ is_urgent: true }}
            />
          }
        />
        <Route
          path="completed"
          element={
            <TaskLayout
              queryParam={{ is_done: true }}
              title="Completed tasks"
            />
          }
        />
        <Route
          path="uncompleted"
          element={
            <TaskLayout
              queryParam={{ is_done: false }}
              title="Uncompleted tasks"
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
