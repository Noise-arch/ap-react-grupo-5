import React, { useState } from "react";
import "./TaskForm.css";
import { v4 as uuidv4 } from 'uuid';

export default function TaskForm({ setTasks, tasks, handleTaskForm }) {
  const [task, setTask] = useState({ id: uuidv4(), createdAt: undefined, title: undefined, desc: undefined, isCompleted: false })

  const createTask = (e) => {
    e.preventDefault();
    // Verifica que los campos no esten vacios
    if (task.title == undefined || task.desc == undefined) {
      return
    }
    setTask({...task, createdAt: new Date()}) // Le pone la fecha actual a la task
    setTasks([...tasks, task]) // setea un nuevo array con los anteriores tasks y el nuevo al final
    handleTaskForm() // Cierra el modal
  };

  return (
    <>
      <div onClick={handleTaskForm} className="modal-bg">
        TaskForm
      </div>
      <div className="formBox">
        <h2>Crear Tarea</h2>
        <form className="form" onSubmit={(e) => createTask(e)}>
          <div className="field">
            <label htmlFor="title">Titulo</label>
            <input onChange={(e) => setTask({ ...task, title: e.currentTarget.value == "" ? undefined : e.currentTarget.value })} type="text" name="title" id="title" />
          </div>
          <div className="field">
            <label htmlFor="desc">Descripción</label>
            <textarea onChange={(e) => setTask({ ...task, desc: e.currentTarget.value == "" ? undefined : e.currentTarget.value })} name="desc" id="desc" />
          </div>
          <button>Crear</button>
        </form>
      </div>
    </>
  );
}
