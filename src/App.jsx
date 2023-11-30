import { useState,useEffect } from 'react'
import TaskList from '../components/TaskList/TaskList'
import TaskForm from '../components/TaskForm/TaskForm'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  const [currentTasks, setCurrentTasks] = useState([])

  

  const [tasks, setTasks] = useState(localStorage.getItem("tasks") !== null ? JSON.parse(localStorage.getItem("tasks")) : [])

  const [taskForm, setTasksForm] = useState({ isOpen: false, editId: undefined })

  const [searchString, setSearchString] =  useState('')

  const handlechangeFilter = (e) => {
    setSearchString(e.target.value)
  }

  useEffect(()=>{
    setCurrentTasks(tasks.filter(tasks => tasks.title.toLowerCase().includes(searchString.toLowerCase)))
  } , [ searchString, tasks]
  
  
  )
 


  return (
    <>
    <div>
     
    </div>

      <ToastContainer />
      <div className="menu">
      <input type="text" placeholder='Escribe para Buscar' value={searchString} onChange={handlechangeFilter}></input>


      <button className='primary-btn' onClick={() => setTasksForm({ isOpen: !(taskForm.isOpen), editId: undefined })}>Crear Tarea</button>
        
      </div>

      
      <TaskList setTasksForm={setTasksForm} tasks={tasks} setTasks={setTasks} />
      {taskForm.isOpen && (
        <TaskForm editId={taskForm.editId} setTasks={setTasks} tasks={tasks} setTasksForm={setTasksForm} />
      )}
    </>
  )
}

export default App
