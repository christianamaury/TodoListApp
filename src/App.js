import React, {useState, useEffect} from "react";
import './App.css';
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {

//..Input Function for the search Bar
const [inputText, setInputText] = useState("");
//..For the todo, array of objects..
const [todos, setTodos] = useState([]);
//..For the filtering dropdown
const [status, setStatus] = useState('all');
const [filteredTodos, setFilteredTodos] = useState([]);

//..It would run only once, basically when the application start
useEffect(() => {
getLocalTodos();
}, []);

useEffect(() => {
console.log("Initial Effect");
filterHandler();
saveLocalTodos();
},[todos, status]);

//..Functions
const filterHandler = () => {
  switch(status){
      case "completed":
      setFilteredTodos(todos.filter((todo) => todo.completed === true));
      break;
      case "uncompleted":
      setFilteredTodos(todos.filter((todo) => todo.completed === false));
      break;
      default:
      setFilteredTodos(todos);
      break;
  }

}

//..Save to Local
const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify([]));
}

//..In order to use it in the todo objects array, we would need to parse it first and later push into the state
//..let todoLocal = localStorage.getItem("todos", JSON.stringify(todos));
const getLocalTodos = () => {
  if(localStorage.getItem("todos") === null){
    localStorage.setItem("todos", JSON.stringify([]));
  } else{
     let todoLocal = JSON.parse(localStorage.getItem("todos"));

     console.log(todoLocal);
  }
}

  return (
    <div className="App">
      <header>
      <h1> Open Tech Alliance </h1>
      </header>
      <h2 className="todo-container"> To Do List Space ✍🏽 </h2>
      <h2 className="todo-container"> Add your daily task in the search bar and press ➕ symbol to keep track of them❗️</h2>

      <Form
        inputText= {inputText}
         todos= {todos}
         setTodos= {setTodos}
         setInputText= {setInputText}
         setStatus= {setStatus}

       />
    <TodoList filteredTodos= {filteredTodos} setTodos= {setTodos} todos= {todos} />
    </div>
  );
}

export default App;
