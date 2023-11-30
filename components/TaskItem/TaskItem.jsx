import React from 'react'
import "./TaskItem.css"

export default function TaskItem({ setTasksForm, deleteTask, task, handleStatus }) {
  return (
    <div className='item'>
      <div className="field">
        <p className='item-title'>{task.title}</p>
      </div>
      <div className="field">
        <p className='item-desc'>{task.desc}</p>
      </div>
      <div className="field">
      <input className='checkbox' defaultChecked={task.isCompleted} onChange={(e) => handleStatus(e.target.checked, task.id)} type="checkbox" name="completed" id="completed" />
        <p style={{backgroundColor: task.isCompleted ? "#4cc9f0" : "#ee9b00"}} className='item-status'>{task.isCompleted == true ? "Completada" : "Pendiente"} </p>
        
      </div>
      <div className="actions">
        <button className='primary-btn' onClick={() => deleteTask(task.id)}>Eliminar</button>
        <button className='primary-btn' onClick={() => setTasksForm({isOpen: true, editId: task.id})}>Editar</button>
      </div>
    </div>
  )
}
