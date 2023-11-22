import { useState } from 'react'

import './App.css'
import TaskList from '../components/TaskList/TaskList'
import { v4 as uuidv4 } from 'uuid';
import TaskForm from '../components/TaskForm/TaskForm'

function App() {
  const [tasks, setTasks] = useState([{ id: uuidv4(), createdAt: new Date(), title: "Prueba", desc: "Descripcion", isCompleted: false }])
  const [taskForm, setTasksForm] = useState({ isOpen: false })

  const handleTaskForm = () => {
    setTasksForm({ isOpen: !(taskForm.isOpen) })
  }

  return (
    <>
      <button className='primary-btn' onClick={handleTaskForm}>Crear Tarea</button>
      <TaskList tasks={tasks} setTasks={setTasks} />
      {taskForm.isOpen && (
        <TaskForm setTasks={setTasks} tasks={tasks} handleTaskForm={handleTaskForm} />
      )}
    </>
  )
}

export default App
