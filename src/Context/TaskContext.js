import createDataContext from "./createDataContext";

const checkAddTask = (selectedType, task) => {
  let addTask = true;
  if (selectedType === "/today") {
    let today = new Date();
    today = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    if (task.date !== today) {
      addTask = false;
    }
  } else if (selectedType === "/important" && !task.is_urgent) {
    addTask = false;
  } else if (selectedType === "/completed" && !task.is_done) {
    addTask = false;
  } else if (selectedType === "/uncompleted" && task.is_done) {
    addTask = false;
  }
  return addTask;
};

const taskReducer = (state, action) => {
  let objIndex;
  let addTask = false;
  switch (action.type) {
    case "add_task":
      addTask = checkAddTask(action.selectedType, action.payload);

      if (addTask) {
        return [...state, action.payload];
      }
      return [...state];

    case "edit_task":
      objIndex = state.findIndex((obj) => obj.url === action.payload.url);
      if (objIndex === -1) {
        return [...state];
      }

      addTask = checkAddTask(action.selectedType, action.payload);
      if (addTask)
        return [
          ...state.slice(0, objIndex),
          action.payload,
          ...state.slice(objIndex + 1),
        ];
      return [...state.slice(0, objIndex), ...state.slice(objIndex + 1)];

    case "delete_task":
      objIndex = state.findIndex((obj) => obj.url === action.payload.url);
      if (objIndex === -1) {
        return [...state];
      }
      return [...state.slice(0, objIndex), ...state.slice(objIndex + 1)];
    case "set_task":
      return [...action.payload];
    default:
      return state;
  }
};

const addTask = (dispatch) => {
  return (payload, selectedType) => {
    dispatch({ type: "add_task", payload, selectedType });
  };
};
const editTask = (dispatch) => {
  return (payload, selectedType) => {
    dispatch({ type: "edit_task", payload, selectedType });
  };
};
const deleteTask = (dispatch) => {
  return (payload) => {
    dispatch({ type: "delete_task", payload });
  };
};
const overRideTask = (dispatch) => {
  return (payload) => {
    dispatch({ type: "set_task", payload });
  };
};

export const { Context, Provider } = createDataContext(
  taskReducer,
  { addTask, editTask, deleteTask, overRideTask },
  []
);
