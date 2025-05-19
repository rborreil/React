import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function TaskRow() {}

function TaskTable() {
  return (
    <>
      <table>
        <thead>
          <th>Selected Task</th>
          <th>Task</th>
          <th>State</th>
        </thead>
        <tbody>
          <tr>
            <td><input type="checkbox" name="" id="" /></td>
            <td>Task 1</td>
            <td>
              State 1 : Active or Done
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function SearchBar() {
  return (
    <>
      <div className="search-bar">
        <label htmlFor="">Search your task thanks to key words :</label>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search Bar ..."
        />

        <div>
          Only display the following tasks :{" "}
          <select name="" id="">
            <option value="">All</option>
            <option value="">Active</option>
            <option value="">Done</option>
          </select>
        </div>
      </div>
    </>
  );
}

function TaskManager() {
  return (
    <>
      <div className="task-manager">
        <input className="add-task" type="button" value="+ New Task" />
        <input className="delete-task" type="button" value="- Delete Task" />
      </div>
    </>
  );
}

function TodoList() {
  return (
    <>
      <TaskManager />
      <SearchBar />
      <TaskTable />
    </>
  );
}

function App() {
  return (
    <>
      <TodoList />
    </>
  );
}

export default App;
