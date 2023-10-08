import { useDispatch, useSelector } from "react-redux";
import { loadTodos } from "../store/reducers/todos";
import { useEffect} from "react";
import LoadingPage from './LoadingPage'
import '../assets/css/TodoList.css'

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.list);
  const notLoaded = useSelector((state)=>state.todos.loading)

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  if (!notLoaded) {
    return (
      <div className="contentWrapper">
        <h1>Todos</h1>
        <div className="addToDo">
          <input type="text" />
          <button>Save</button>
        </div>
        <ul className="todoData">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input type="checkbox" defaultChecked={todo.completed}/>
              <input
                name="title"
                defaultValue={todo.title}
                type="text"
                placeholder="Type to do thing"
              />
              <button className="saveBtn">Save</button>
              <button>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    )
  } else {
    return (<LoadingPage />)
  }
};

export default TodoList;