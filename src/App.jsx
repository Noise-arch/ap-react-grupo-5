import { useState, useEffect } from 'react'
import TaskList from '../components/TaskList/TaskList'
import TaskForm from '../components/TaskForm/TaskForm'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  const [searchedTasks, setSearchedTasks] = useState([])
  const [tasks, setTasks] = useState(localStorage.getItem("tasks") !== null ? JSON.parse(localStorage.getItem("tasks")) : [])
  const [taskForm, setTasksForm] = useState({ isOpen: false, editId: undefined })

  const search = (searchString) => {
    if (searchString == "") return setSearchedTasks([])
    const sTasks = tasks.filter((task) => {
      if (task.title.toLowerCase().includes(searchString.toLowerCase())) {
        return task
      }
    })
    if (sTasks.length == 0) {
      setSearchedTasks([])
      toast.error(`No existe tal tarea.`, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      return
    }
    setSearchedTasks(sTasks)
  }

  return (
    <>
      <ToastContainer />
      <div className="menu">
        <input type="text" placeholder='Escribe para Buscar' onChange={(e) => search(e.currentTarget.value)} />
        <button className='primary-btn' onClick={() => setTasksForm({ isOpen: !(taskForm.isOpen), editId: undefined })}>Crear Tarea</button>
      </div>
      <TaskList setTasksForm={setTasksForm} tasks={tasks} searchedTasks={searchedTasks} setTasks={setTasks} />
      {taskForm.isOpen && (
        <TaskForm editId={taskForm.editId} setTasks={setTasks} tasks={tasks} setTasksForm={setTasksForm} />
      )}
    </>
  )
}

export default App
