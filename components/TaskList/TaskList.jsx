import React from 'react'
import TaskItem from '../TaskItem/TaskItem'
import "./TaskList.css"
import { toast } from 'react-toastify'


export default function TaskList({ setTasksForm, tasks, setTasks }) {
  const handleStatus = (bool, id) => {
    // Busca el index de la tarea segun id, crea una copia y modifica por el valor del estado en la copia del array
    const indexModTask = tasks.findIndex((task) => task.id == id)
    const tasksCopy = [...tasks];
    tasksCopy[indexModTask].isCompleted = bool;
    // Ordena el array por criterio de estado (isCompleted), en caso de empate ordena por fecha de creacion (createdAt)
    tasksCopy.sort(function (a, b) {
      if (Number(a.isCompleted) == Number(b.isCompleted)) {
        console.log(b.createdAt - a.createdAt)
        return b.createdAt - a.createdAt
      }
      return Number(a.isCompleted) - Number(b.isCompleted)
    })
    // Almacena el array modificado en localStorage, actualiza el estado tasks y envia una notificacion
    localStorage.setItem("tasks", JSON.stringify(tasksCopy))
    setTasks(tasksCopy)
    toast.success(`Estado de tarea "${tasksCopy[indexModTask].title}" actualizado.`, {
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
  const deleteTask = (id) => {
    // Crea un nuevo array con todas las tareas con id diferente al pasado en los parametros
    const updatedTasks = tasks.filter((t) => t.id !== id)
    // Almacena el nuevo array en localStorage, actualiza el estado tasks y envia una notificacion
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    setTasks(updatedTasks)
    toast.success("Tarea Eliminada.", {
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
  return (
    <div className='list'>
      <div className='head'>
        <div className="field">
          <p className='item-title'>Completada?</p>
        </div>
        <div className="field">
          <p className='item-title'>Título</p>
        </div>
        <div className="field">
          <p className='item-desc'>Descripción</p>
        </div>
        <div className="field">
          <p className='item-status'>Estado</p>
        </div>
        <div className="field">
          <p className='item-status'>Acciones</p>
        </div>
      </div>
      <hr className='separator-primary' />
      {tasks.map((task, index) =>
        <>
          <TaskItem setTasksForm={setTasksForm} deleteTask={deleteTask} handleStatus={handleStatus} key={task.id} task={task} />
          {index + 1 !== tasks.length && <hr className='separator-secondary' />}
        </>
      )}
    </div>
  )
}
