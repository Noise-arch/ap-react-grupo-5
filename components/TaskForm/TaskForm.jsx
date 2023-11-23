import React, { useState } from "react";
import "./TaskForm.css";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";

export default function TaskForm({ editId, setTasks, tasks, setTasksForm }) {
  const [task, setTask] = useState({
    title: editId !== undefined ? tasks.find((task) => task.id == editId).title : "",
    desc: editId !== undefined ? tasks.find((task) => task.id == editId).desc : "",
  })

  const createTask = (e) => {
    e.preventDefault();
    // Verifica que los campos no esten vacios
    if (task.title == "" || task.desc == "") return toast.error(`Campos vacíos.`, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    if (editId != undefined) {
      // Modo edicion, reemplaza el objeto en el array por el nuevo modificado
      const tasksCopy = [...tasks]; // Crea una copia
      const indexTask = tasks.findIndex((task) => task.id == editId)
      tasksCopy[indexTask] = task;
      // Almacena el array modificado en localStorage, actualiza el estado tasks y envia una notificacion
      localStorage.setItem("tasks", JSON.stringify(tasksCopy))
      setTasks(tasksCopy)
      setTasksForm({ isOpen: false, editId: undefined }) // Cierra el modal y define editId como undefined 
      toast.success(`Tarea "${tasksCopy[indexTask].title}" actualizada.`, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      // Modo creacion, genera un objeto newTask con los valores de los inputs, la fecha y un id
      const newTask = {
        title: task.title,
        desc: task.desc,
        createdAt: new Date(),
        id: uuidv4(),
      }
      setTasks([newTask, ...tasks]) // Arma un nuevo array con la nueva tarea adelante y los elementos del array tasks despues
      localStorage.setItem("tasks", JSON.stringify([newTask, ...tasks]))
      setTasksForm({ isOpen: false, editId: undefined }) // Cierra el modal
      toast.success(`Tarea creada.`, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

  };


  return (
    <>
      <div onClick={() => setTasksForm({ isOpen: false, editId: undefined })} className="modal-bg">
        TaskForm
      </div>
      <div className="formBox">
        <h2>Crear Tarea</h2>
        <form className="form" onSubmit={(e) => createTask(e)}>
          <div className="field">
            <label htmlFor="title">Titulo</label>
            <input defaultValue={task.title} onChange={(e) => setTask({ ...task, title: e.currentTarget.value })} type="text" name="title" id="title" />
          </div>
          <div className="field">
            <label htmlFor="desc">Descripción</label>
            <textarea defaultValue={task.desc} onChange={(e) => setTask({ ...task, desc: e.currentTarget.value })} name="desc" id="desc" />
          </div>
          <button>{editId !== undefined ? "Editar" : "Crear"}</button>
        </form>
      </div>
    </>
  );
}
