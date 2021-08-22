import React, { useEffect, useState } from "react";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import "./style/App.scss";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { stringify } from "querystring";

const App: React.FC = () => {
  // State
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Called from stored todos from localStorage
    const savedTodos = localStorage.getItem("todo");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  const [completedTodos, setCompletedTodos] = useState<Todo[]>(() => {
    // Called from stored todos from localStorage
    const savedCompletedTodos = localStorage.getItem("completedTodo");
    if (savedCompletedTodos) {
      return JSON.parse(savedCompletedTodos);
    } else {
      return [];
    }
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      localStorage.setItem("todo", JSON.stringify(todos));

      // cleanUp todo
      setTodo("");
      localStorage.setItem("completedTodo", JSON.stringify(completedTodos));
    }
  };

  // drapable function
  // drag 된 곳에 결과 값을 받아서 state 에 값을 저장하는 function
  const onDragEnd = (result: DropResult) => {
    // result 로 넘어오는 값확인 source : 원래 위치 destination : drop 된 목적지를 가리킴
    // console.log(result);
    const { source, destination } = result;

    // destination 이 drop 이 가능하지 않은 밖에 놨을때 아무일도 일어나지 않게
    if (!destination) return;
    // 같은 zone 에 drop 되었을때와 같은 index 일때 아무것도 일어 나지 않게 함
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // DnD logic
    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    // dnd event 발생기 state 에 저장 및 localStorage 에 data 저장
    setCompletedTodos(complete);
    localStorage.setItem("completedTodo", JSON.stringify(completedTodos));
    setTodos(active);
    localStorage.setItem("todo", JSON.stringify(todos));
  };

  // mount 시 localStorage 의 data 가져오기
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
    localStorage.setItem("completedTodo", JSON.stringify(completedTodos));
  }, [todos, completedTodos]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">To Do List</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
