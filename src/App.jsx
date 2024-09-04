import { useEffect, useState,} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let chack = localStorage.getItem("todos")
    if(chack)
    {
      let svtodos = JSON.parse(localStorage.getItem("todos"))
      setTodos(svtodos)
    }
  }, [])
  

  const savetodo =(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
    
  }

  const contendadd = () => {
    setTodos([...todos, {id:uuidv4(), todo, inCompleted: false }])
    setTodo("")
    savetodo()
  }

  const contendedit = (e, id) => {
    // first line is throve in inpute box value
    let t =todos.filter(item=>item.id === id)
    setTodo(t[0].todo)

    // delete 
    let newTodo = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodo)
    savetodo()
  }

  const contenddelete = (e,id) => {
    let newTodo = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodo);
    savetodo()
  }

  const contendchange = (e) => {
    setTodo(e.target.value)
  }

  const chackonoff = (e)=>{
    // give id
    let id=e.target.name

    // give index
    let index= todos.findIndex(item=>{
      return item.id === id;
    })
    
    // Store New Arry
    let newTods = [...todos];
    newTods[index].inCompleted =!newTods[index].inCompleted;
    setTodos(newTods); 
    savetodo()
  }

  return (
    <>
      <Navbar />
      <div className='bg-violet-200 mt-2 w-[90%] min-h-[80vh] rounded-lg p-5 mx-auto align-middle'>

        {/* Add Content */}
        <div>
          <span className='py-3 text-2xl'>Add Todo List</span>
          <div className='flex gap-3 mt-2'>
            <input onChange={contendchange} value={todo} type="text" className='w-1/2 rounded' />
            <button onClick={contendadd} disabled={todo.length<=3} className='bg-violet-700 hover:bg-violet-900 rounded-md p-3 py-1 text-white mx-6'>Save</button>
          </div>
          <div className=' p-3 text-2xl font-bold mt-5'>Your Todo List</div>

          {/* Show ,Delete And Add Content */}
          {todos.length==0 && <div className='p-3  text-2xl mt-5'>Your List Is Empty</div>}
          {todos.map((item) => {
            return <div key={item.id} className='flex w-[100%] gap-2 mt-7 justify-between '>
              <div className="flex ">
              <input onChange={chackonoff} name={item.id} checked={item.inCompleted} className='mr-5' type="checkbox" />
              <h2 className={item.inCompleted ? "line-through" : ""} >
              {item.todo}</h2>
              </div>
              <div className="button h-full">
                {/* onclik function give id second rite */}
                <button onClick={(e)=>{contendedit(e,item.id)}} className='bg-violet-700 hover:bg-violet-900 rounded-md p-3 py-1 text-white mx-4'>Edit</button>
                <button onClick={(e)=>{contenddelete(e,item.id)}} className='bg-violet-700 hover:bg-violet-900 rounded-md p-3 py-1 text-white mx-4'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
