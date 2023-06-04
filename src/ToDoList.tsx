import { useState } from "react";
import './TodoApp.css';

const ToDoList: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { text: inputValue, completed: false, subtask: [] }]);
      let updatedTodos = [...todos];
      updatedTodos.push({
        text: inputValue,
        completed: false,
        subtask: [],
      });
      setCount(
        updatedTodos.filter((item: any) => item?.completed == false).length
      );
      setInputValue("");
    }
  };

  const handleAddSubTask = (index: any) => {
    const updatedTodos = [...todos];
    const subtask = prompt("Please enter sub task:");
    console.log(subtask);
    if (subtask === null || subtask === "") {
      //   console.log()
    } else {
      const subTaskObj = {
        text: subtask,
        completed: false,
      };
      updatedTodos[index].subtask.push(subTaskObj);
      setTodos(updatedTodos);
    }
  };

  const handleDeleteTodo = (index: any) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setCount(
      updatedTodos.filter((item: any) => item?.completed == false).length
    );
    setTodos(updatedTodos);
  };

  const handleToggleComplete = (index: any) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setCount(
      updatedTodos.filter((item: any) => item?.completed == false).length
    );
    setTodos(updatedTodos);
  };

  const handleSubTaskDeleteTodo = (subTaskIndex: any, index: any) => {
    const updatedTodos = [...todos];
    updatedTodos[index].subtask.splice(subTaskIndex, 1);
    setCount(
      updatedTodos.filter((item: any) => item?.completed == false).length
    );
    setTodos(updatedTodos);
  };

  const handleToggleSubTaskComplete = (subTaskIndex: any, index: any) => {
    const updatedTodos = [...todos];
    updatedTodos[index].subtask[subTaskIndex].completed =
      !updatedTodos[index].subtask[subTaskIndex].completed;
    setCount(
      updatedTodos.filter((item: any) => item?.completed == false).length
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <h2>
        My To-Do List
        <br />
        <small className="pending">Pending {count}</small>
      </h2>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a task"
          className="input-field"
        />
        &nbsp;&nbsp;
        <button onClick={handleAddTodo} className="add-btn">
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <div className="todo-div">
              <div>
                <span
                  onClick={() => handleToggleComplete(index)}
                  className="todo-text"
                >
                  {todo.text}
                </span>
              </div>
              <div>
                <button
                  onClick={() => handleAddSubTask(index)}
                  className="add-btn"
                >
                  Add Sub Task
                </button>
                <button
                  onClick={() => handleDeleteTodo(index)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Sub Task */}
            {todo?.subtask?.length > 0 ? (
              <ul className="todo-list">
                {todo?.subtask?.map((subtask: any, subTaskIndex: any) => (
                  <li
                    key={subTaskIndex}
                    className={`todo-item subtask ${
                      subtask.completed ? "completed" : ""
                    }`}
                  >
                    <span
                      onClick={() =>
                        handleToggleSubTaskComplete(subTaskIndex, index)
                      }
                      className="todo-text"
                    >
                      {subtask.text}
                    </span>
                    <div>
                      <button
                        onClick={() =>
                          handleSubTaskDeleteTodo(subTaskIndex, index)
                        }
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
