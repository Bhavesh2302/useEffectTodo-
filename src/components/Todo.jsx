import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import style from "./style.module.css"

const Todo = () => {
  const [todos, settodos] = useState([])
  const [newtodo, setnewtodo] = useState("")
  const [page, setpage] = useState(1)



  const saveinfo =()=>{



  fetch("http://localhost:3004/todos",{
    method:"POST",
    headers:{
      "content-type":"application/json",
    },
    body:JSON.stringify({
text:newtodo,
isCompleted:false,

    })
  })

  .then((r)=>r.json())
  .then((d)=>{
   
     settodos([...todos,d])
    setnewtodo("")

});
}


  useEffect(()=>{
    fetch( `  http://localhost:3004/todos?_page=${page}&_limit=3`)
  .then((r)=>r.json())
  .then((d)=>{
   
 
    settodos(d)
  
});
},[page])

const handlePage=(value)=>{
setpage(value)


}


  return (
    <div className={style.tododiv}>
      <h1 className={style.todoheader}>Todo List</h1>
     <div className={style.inputdiv}>
       <input className={style.inputbox} value={newtodo} placeholder="Add Something"
       onChange={({target})=>setnewtodo(target.value)}/>
       <button className={style.savebutton} onClick={saveinfo}>+</button>
    

       {todos.map((todo)=>(
    <div key={todo.id}  >{todo.text}</div>

    ) )}

    <div className={style.pagedisplay}>
    <div className={style.pageclick}onClick={()=>handlePage(1)}>1</div>
    <div className={style.pageclick} onClick={()=>handlePage(2)}>2</div>
    <div className={style.pageclick} onClick={()=>handlePage(3)}>3</div>
    </div>
     </div>

     
    </div>
  );
}


export default Todo