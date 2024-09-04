// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";
// import Modal from "./Modal";

// axios.defaults.baseURL = "http://localhost:8000";

// function App() {
//   const [inputTodo, setInputTodo] = useState("");
//   const [todos, setTodos] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const [editTodoDesc, setEditTodoDesc] = useState("");
//   const [editTodoId, setEditTodoId] = useState(null);
//   const [editTodoChecked, setEditTodoChecked] = useState(false);

//   useEffect(() => {
//     axios.get("/todos").then((resp) => {
//       setTodos(resp.data);
//     });
//   }, []);

//   const addTodo = async (e) => {
//     e.preventDefault();
//     if (inputTodo.trim() === "") return; // Prevent adding empty todos

//     const data = {
//       desc: inputTodo,
//       completed: false,
//     };

//     try {
//       const resp = await axios.post("/todos", data);
//       if (resp.status === 200 || resp.status === 201) {
//         setTodos((prevTodos) => [...prevTodos, resp.data]);
//         setInputTodo("");
//       }
//     } catch (error) {
//       console.error("Error adding todo:", error);
//     }
//   };

//   async function editTodo(e, todo) {
//     e.preventDefault();
//     setEditMode(true);
//     setEditTodoDesc(todo.todo_desc);
//     setEditTodoId(todo.id);
//     setEditTodoChecked(todo.todo_completed);
//   }

//   async function updateTodo(e) {
//     e.preventDefault();

//     const data = {
//       desc: editTodoDesc,
//       completed: editTodoChecked,
//     };

//     try {
//       const resp = await axios.put(`/todos/${editTodoId}`, data);
//       if (resp.status === 200) {
//         // Update the state immediately
//         setTodos((prevTodos) =>
//           prevTodos.map((t) =>
//             t.id === editTodoId
//               ? {
//                   ...t,
//                   todo_desc: editTodoDesc,
//                   todo_completed: editTodoChecked,
//                 }
//               : t
//           )
//         );
//         setEditMode(false);
//       }
//     } catch (error) {
//       console.error("Error updating todo:", error);
//     }
//   }

//   async function deleteTodo(e, todo) {
//     e.preventDefault();

//     try {
//       const resp = await axios.delete(`/todos/${todo.id}`);
//       if (resp.status === 200) {
//         setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
//       }
//     } catch (error) {
//       console.error("Error deleting todo:", error);
//     }
//   }

//   async function clearAllTodos(e) {
//     e.preventDefault();

//     try {
//       await axios.delete("/todos");
//       setTodos([]);
//     } catch (error) {
//       console.error("Error clearing all todos:", error);
//     }
//   }

//   async function handleCheckboxChange(e, todo) {
//     const updatedTodo = {
//       ...todo,
//       todo_completed: e.target.checked,
//     };

//     try {
//       await axios.put(`/todos/${todo.id}`, {
//         desc: updatedTodo.todo_desc,
//         completed: updatedTodo.todo_completed,
//       });

//       setTodos((prevTodos) =>
//         prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
//       );
//     } catch (error) {
//       console.error("Error updating todo:", error);
//     }
//   }

//   if (editMode) {
//     return (
//       <form onSubmit={updateTodo} className="">
//         <div className="">Edit Todo</div>
//         <div className="">
//           <label className="">Todo Desc:</label>
//           <input
//             className=""
//             type="text"
//             placeholder="Enter Todo"
//             value={editTodoDesc}
//             onChange={(e) => setEditTodoDesc(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <input
//             type="checkbox"
//             checked={editTodoChecked}
//             onChange={(e) => setEditTodoChecked(e.target.checked)}
//           />
//         </div>
//         <button className="">Submit</button>
//       </form>
//     );
//   }

//   return (
//     <div className="container">
//       <div className="headBox">Todo List PostgreSQL</div>
//       <div className="inputBox">
//         <input
//           className=""
//           type="text"
//           placeholder="Enter Todo"
//           value={inputTodo}
//           onChange={(e) => setInputTodo(e.target.value)}
//         />
//         <button onClick={addTodo} className="">
//           Add
//         </button>
//         <button onClick={clearAllTodos} className="">
//           Clear
//         </button>
//       </div>
//       <div className="box">
//         {todos.length >= 1 && (
//           <div className="">
//             {todos.map((todo, index) => (
//               <div className="itemBox" key={index}>
//                 <div className="box1">
//                   <input
//                     type="checkbox"
//                     checked={todo.todo_completed}
//                     onChange={(e) => handleCheckboxChange(e, todo)}
//                   />
//                   <div className="box2">{todo.todo_desc}</div>
//                 </div>
//                 <div className="box3">
//                   <button onClick={(e) => editTodo(e, todo)} className="">
//                     Edit
//                   </button>
//                   <button onClick={(e) => deleteTodo(e, todo)} className="">
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Modal from "./Modal";

axios.defaults.baseURL = "http://localhost:8000";

function App() {
  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTodoDesc, setEditTodoDesc] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoChecked, setEditTodoChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [todoToDelete, setTodoToDelete] = useState(null);

  useEffect(() => {
    axios.get("/todos").then((resp) => {
      setTodos(resp.data);
    });
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (inputTodo.trim() === "") return; // Prevent adding empty todos

    const data = {
      desc: inputTodo,
      completed: false,
    };

    try {
      const resp = await axios.post("/todos", data);
      if (resp.status === 200 || resp.status === 201) {
        setTodos((prevTodos) => [...prevTodos, resp.data]);
        setInputTodo("");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  async function editTodo(e, todo) {
    e.preventDefault();
    setEditMode(true);
    setEditTodoDesc(todo.todo_desc);
    setEditTodoId(todo.id);
    setEditTodoChecked(todo.todo_completed);
  }

  async function updateTodo(e) {
    e.preventDefault();

    const data = {
      desc: editTodoDesc,
      completed: editTodoChecked,
    };

    try {
      const resp = await axios.put(`/todos/${editTodoId}`, data);
      if (resp.status === 200) {
        setTodos((prevTodos) =>
          prevTodos.map((t) =>
            t.id === editTodoId
              ? {
                  ...t,
                  todo_desc: editTodoDesc,
                  todo_completed: editTodoChecked,
                }
              : t
          )
        );
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  const deleteTodo = (e, todo) => {
    e.preventDefault();
    setModalAction("delete");
    setTodoToDelete(todo);
    setShowModal(true);
  };

  const clearAllTodos = (e) => {
    e.preventDefault();
    setModalAction("clearAll");
    setShowModal(true);
  };

  const handleCheckboxChange = async (e, todo) => {
    const updatedTodo = {
      ...todo,
      todo_completed: e.target.checked,
    };

    try {
      await axios.put(`/todos/${todo.id}`, {
        desc: updatedTodo.todo_desc,
        completed: updatedTodo.todo_completed,
      });

      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const confirmModalAction = async () => {
    if (modalAction === "delete") {
      try {
        const resp = await axios.delete(`/todos/${todoToDelete.id}`);
        if (resp.status === 200) {
          setTodos((prevTodos) =>
            prevTodos.filter((t) => t.id !== todoToDelete.id)
          );
        }
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    } else if (modalAction === "clearAll") {
      try {
        await axios.delete("/todos");
        setTodos([]);
      } catch (error) {
        console.error("Error clearing all todos:", error);
      }
    }
    setShowModal(false);
  };

  const cancelModalAction = () => {
    setShowModal(false);
  };

  if (editMode) {
    return (
      <div className="mainFormBox">
        <form className="formBox" onSubmit={updateTodo}>
          <div className="headBox">
            <h2>Edit Todo</h2>
          </div>
          <div className="inputBox">
            <label>Todo Desc:</label>
            <input
              className="editInput"
              type="text"
              placeholder="Enter Todo"
              value={editTodoDesc}
              onChange={(e) => setEditTodoDesc(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <label>Completed:</label>
            <input
              type="checkbox"
              checked={editTodoChecked}
              onChange={(e) => setEditTodoChecked(e.target.checked)}
            />

            <button className="addBtn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <Modal
        show={showModal}
        onClose={cancelModalAction}
        onConfirm={confirmModalAction}
        title={modalAction === "delete" ? "Delete Todo" : "Clear All Todos"}
        message={
          modalAction === "delete"
            ? "Are you sure you want to delete this todo?"
            : "Are you sure you want to clear all todos?"
        }
      />
      <div className="headBox">
        <h1>Todo List PostgreSQL</h1>
      </div>
      <div className="inputBox">
        <input
          className="inputDiv"
          type="text"
          placeholder="Enter Todo"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <button className="addBtn" onClick={addTodo}>
          Add
        </button>
        <button className="clearBtn" onClick={clearAllTodos}>
          Clear
        </button>
      </div>
      <div className="box">
        {todos.length >= 1 && (
          <div>
            {todos.map((todo, index) => (
              <div className="itemBox" key={index}>
                <div className="box1">
                  <input
                    type="checkbox"
                    checked={todo.todo_completed}
                    onChange={(e) => handleCheckboxChange(e, todo)}
                  />
                  <div className="box2">{todo.todo_desc}</div>
                </div>
                <div className="box3">
                  <button
                    className="editBtn"
                    onClick={(e) => editTodo(e, todo)}
                  >
                    Edit
                  </button>{" "}
                  {/* Triggering editTodo */}
                  <button
                    className="clearBtn"
                    onClick={(e) => deleteTodo(e, todo)}
                  >
                    Delete
                  </button>{" "}
                  {/* Triggering deleteTodo */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
