import createDataContext from "./createDataContext";

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case "toggle_add_task":
      return { ...state, showAddNewTask: !state.showAddNewTask };
    case "toggle_menu":
      return { ...state, showMenuBar: !state.showMenuBar };
    case "toggle_account":
      return { ...state, showAccountBar: !state.showAccountBar };
    default:
      return state;
  }
};

const toggleShowAddNewTask = (dispatch) => {
  return () => {
    dispatch({ type: "toggle_add_task" });
  };
};

const toggleShowMenuBar = (dispatch) => {
  return () => {
    dispatch({ type: "toggle_menu" });
  };
};
const toggleShowAccountBar = (dispatch) => {
  return () => {
    dispatch({ type: "toggle_account" });
  };
};

export const { Context, Provider } = createDataContext(
  dashboardReducer,
  {
    toggleShowAddNewTask,
    toggleShowMenuBar,
    toggleShowAccountBar,
  },
  {
    showAddNewTask: false,
    showMenuBar: false,
    showAccountBar: false,
  }
);
