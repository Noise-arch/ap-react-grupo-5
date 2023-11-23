import React from 'react'
import "./TaskItem.css"

export default function TaskItem({ setTasksForm, deleteTask, task, handleStatus }) {
  return (
    <div className='item'>
      <div className="field">
        <input className='checkbox' defaultChecked={task.isCompleted} onChange={(e) => handleStatus(e.target.checked, task.id)} type="checkbox" name="completed" id="completed" />
      </div>
      <div className="field">
        <p className='item-title'>{task.title}</p>
      </div>
      <div className="field">
        <p className='item-desc'>{task.desc}</p>
      </div>
      <div className="field">
        <p className='item-status'>{task.isCompleted == true ? "Completada" : "Pendiente"} </p>
      </div>
      <div className="actions">
        <button onClick={() => deleteTask(task.id)}>Eliminar</button>
        <button onClick={() => setTasksForm({isOpen: true, editId: task.id})}>Editar</button>
      </div>
    </div>
  )
}
