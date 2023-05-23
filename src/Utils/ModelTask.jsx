import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "./Model";

const InputCheckbox = ({ isChecked, setChecked, label }) => {
  return (
    <label className="mb-0 flex items-center cursor-pointer">
      <div className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
        {isChecked && (
          <span className="bg-rose-500 w-2 h-2 block rounded-full"></span>
        )}
      </div>
      <span className="order-1 flex-1">{label}</span>
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={() => setChecked((prev) => !prev)}
      />
    </label>
  );
};

const ModalCreateTask = ({ onClose, task, nameForm, onConfirm }) => {
  const today = new Date();
  const maxDate = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );

  const [content, setContent] = useState(() => {
    if (task) {
      return task.content;
    }
    return "";
  });
  const [title, setTitle] = useState(() => {
    if (task) {
      return task.title;
    }
    return "";
  });
  const [date, setDate] = useState(() => {
    if (task) {
      const dateStr = task.date.split("T")[0];
      const fullDate = new Date(dateStr.replaceAll("-", "/"));
      return fullDate;
    }
    return today;
  });

  const [isImportant, setIsImportant] = useState(() => {
    if (task) {
      return task.is_urgent;
    }
    return false;
  });

  const [isCompleted, setIsCompleted] = useState(() => {
    if (task) {
      return task.is_done;
    }
    return false;
  });

  const [url, setUrl] = useState(() => {
    if (task) {
      return task.url;
    }
    return "";
  });

  const addNewTaskHandler = (event) => {
    const newTask = {
      title: title,
      content: content,
      date: new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0],
      is_done: isCompleted,
      is_urgent: isImportant,
      url: url,
    };
    onConfirm(newTask);
    onClose();
  };
  return (
    <Modal onClose={onClose} title={nameForm}>
      <form
        className="flex flex-col stylesInputsField"
        onSubmit={addNewTaskHandler}
      >
        <label>
          Title
          <input
            type="text"
            placeholder="e.g, study for the test"
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="w-full"
          />
        </label>
        <label>
          Date
          <DatePicker
            className="w-full"
            selected={date}
            required
            onChange={(val) => setDate(val)}
            minDate={today}
            maxDate={maxDate}
          />
        </label>
        <label>
          Description
          <textarea
            placeholder="e.g, study for the test"
            className="w-full"
            required
            value={content}
            onChange={({ target }) => setContent(target.value)}
          ></textarea>
        </label>
        <InputCheckbox
          isChecked={isImportant}
          setChecked={setIsImportant}
          label="Mark as important"
        />
        <InputCheckbox
          isChecked={isCompleted}
          setChecked={setIsCompleted}
          label="Mark as completed"
        />
        <button type="submit" className="btn mt-5">
          {nameForm}
        </button>
      </form>
    </Modal>
  );
};

export default ModalCreateTask;
