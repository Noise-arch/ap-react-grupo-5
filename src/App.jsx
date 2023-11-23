import { useEffect, useState } from 'react'

import './App.css'
import TaskList from '../components/TaskList/TaskList'
import { v4 as uuidv4 } from 'uuid';
import TaskForm from '../components/TaskForm/TaskForm'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [tasks, setTasks] = useState(localStorage.getItem("tasks") !== null ? JSON.parse(localStorage.getItem("tasks")) : [])
  const [taskForm, setTasksForm] = useState({ isOpen: false, editId: undefined })
  return (
    <>
      <ToastContainer />
      <button className='primary-btn' onClick={() => setTasksForm({ isOpen: !(taskForm.isOpen), editId: undefined })}>Crear Tarea</button>
      <TaskList setTasksForm={setTasksForm} tasks={tasks} setTasks={setTasks} />
      {taskForm.isOpen && (
        <TaskForm editId={taskForm.editId} setTasks={setTasks} tasks={tasks} setTasksForm={setTasksForm} />
      )}
    </>
  )
}

export default App
