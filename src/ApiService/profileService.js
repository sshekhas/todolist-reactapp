import HttpClient from "./HttpClient";
import backendconstat from "./backendConstant";

const { todoList, taskDetails } = backendconstat;

//export API call for users route

export default {
  postTodo(payload) {
    return HttpClient.postUrl(todoList, { data: payload });
  },

  deleteTodo(url) {
    return HttpClient.deleteUrl(url);
  },

  patch(url, payload) {
    return HttpClient.patchUrl(url, { data: payload });
  },

  getdoTo(options) {
    return HttpClient.getUrl(todoList, options);
  },

  getTaskDetails() {
    return HttpClient.getUrl(taskDetails);
  },
};
