import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import "../style/App.scss";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <>
      <div className="container">
        <Droppable droppableId="TodosList">
          {(provided, snapshot) => (
            <div
              className="todos"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">To Do</span>
              {todos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  todos={todos}
                  key={todo.id}
                  setTodos={setTodos}
                />
              ))}
              {/* make drapable area  */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="TodosRemove">
          {(provided, snapshot) => (
            <div
              className={`remove ${
                snapshot.isDraggingOver ? "dragcomplete" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="remove__heading">Completed</span>
              {completedTodos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  todos={completedTodos}
                  key={todo.id}
                  setTodos={setCompletedTodos}
                />
              ))}
              {/* make drapable area  */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default TodoList;
