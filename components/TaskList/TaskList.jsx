import React from 'react'
import TaskItem from '../TaskItem/TaskItem'
import "./TaskList.css"

export default function TaskList({ tasks, setTasks }) {

  const handleStatus = (bool, id) => {
    const indexModTask = tasks.findIndex((task) => task.id == id)
    const tasksCopy = [...tasks]; // Crea una deep copy
    tasksCopy[indexModTask].isCompleted = bool;
    setTasks(tasksCopy)
  }
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id)
    setTasks(updatedTasks)
  }


  return (
    <div className='list'>
      <div className="head">
        <p>Completada?</p>
        <p>Titulo</p>
        <p>Descripción</p>
        <p>Estado</p>
        <p>Acciones</p>
      </div>
      {tasks.map((task) =>
        <TaskItem deleteTask={deleteTask} handleStatus={handleStatus} key={task.id} task={task} />
      )}
    </div>
  )
}
