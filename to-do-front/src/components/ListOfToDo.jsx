import React, { useContext, useEffect, useState } from "react";
import { Store } from "../stateManagement/StoreProvider";

const ListOfToDo = () => {
  const { state, dispatch } = useContext(Store);
  const [title, setTitle] = useState("");

  useEffect(() => {
    let listOfCategories = fetchAllCategories().then((categories) => {
      let action = {
        type: "get-categories",
        payload: categories,
      };
      dispatch(action);
    });
  }, []);

  const fetchAllCategories = async () => {
    let response = await fetch(`http://localhost:8081/api/get/categories`);
    let data = await response.json();
    return data;
  };

  const onCheckbox = async (event, tsk) => {
    const checked = event.currentTarget.checked;

    const taskToUpdate = {
      ...tsk,
      done: checked,
    };

    // console.log(taskToUpdate);
    let taskUpdatedPromise = await fetch(
      `http://localhost:8081/api/update/task`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(taskToUpdate),
      }
    );

    let categoryUpdated = await taskUpdatedPromise.json();

    const taskUpdated = categoryUpdated.tasks.find(
      (task) => task.id === taskToUpdate.id
    );

    dispatch({
      type: "update-task",
      payload: taskUpdated,
    });
  };

  const onDeleteCategory = async (note) => {
    let response = await fetch(
      `http://localhost:8081/api/delete/category/${note.id}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 200) {
      dispatch({
        type: "remove-category",
        payload: note,
      });
    }
  };

  const onDeleteTask = async (tsk) => {
    let response = await fetch(
      `http://localhost:8081/api/delete/task/${tsk.id}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 200) {
      dispatch({
        type: "remove-task",
        payload: tsk,
      });
    }
  };

  const onAddTask = async (note) => {
    if (title) {
      const taskFromForm = {
        title: title,
        done: false,
        fkCategoryId: note.id,
      };

      let response = await fetch(`http://localhost:8081/api/save/task`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(taskFromForm),
      });

      let categoryWithNewTask = await response.json();

      if (response.status === 200) {
        dispatch({
          type: "add-task",
          payload: categoryWithNewTask,
        });
      }
    }
  };

  const addingTitle = (e) => {
    setTitle(e.target.value);
  };

  const onEditTask = async (tsk) => {
    const taskToUpdate = {
        ...tsk,
        title: title,
      };
  
      // console.log(taskToUpdate);
      let taskUpdatedPromise = await fetch(
        `http://localhost:8081/api/update/task`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(taskToUpdate),
        }
      );
  
      let categoryUpdated = await taskUpdatedPromise.json();
  
      const taskUpdated = categoryUpdated.tasks.find(
        (task) => task.id === taskToUpdate.id
      );
  
      dispatch({
        type: "update-task",
        payload: taskUpdated,
      });
      }


      const editingTitle = (e) => {
        setTitle(e.target.value);
      };


  return (
    <div>
      <h1>Actions pending to be done</h1>
      <ul>
        {state.map((note) => {
          return (
            <div key={note.id}>
              {note.name} <br />
              <button onClick={() => onDeleteCategory(note)}>
                Delete
              </button>{" "}
              <br />
              <input type="text" onChange={addingTitle} name="title" />
              <button onClick={() => onAddTask(note)}>Add New List</button>
              {note.tasks.map((tsk) => (
                <li key={tsk.id}>
                  {tsk.title} <br />
                  <input type="text" onChange={editingTitle} name="editedTitle" id="popup" class="hide"></input>
                  <button onClick={() => onEditTask(tsk)}>Edit Task</button>
                  <button onClick={() => onDeleteTask(tsk)}>Delete</button>
                  <input
                    onChange={(event) => onCheckbox(event, tsk)}
                    type="checkbox"
                    checked={tsk.done}
                  />
                </li>
              ))}{" "}
              <br />
              <p>---------------------------</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

//onChange executes an action
export default ListOfToDo;
