import React, { useRef, useState } from "react";
import { Todo } from "../model";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDoneAll } from "react-icons/md";
import "../style/App.scss";
import { useEffect } from "react";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  // state Edit
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  // handleEdit function
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  // handleDone function
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  // handleDelete function
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // useRef (autofocus edit input )
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <>
      <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
        {edit ? (
          <input
            ref={inputRef}
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            className="todos__single--text"
          />
        ) : todo.isDone ? (
          <s className="todos__single--text">{todo.todo}</s>
        ) : (
          <span className="todos__single--text">{todo.todo}</span>
        )}

        <div>
          <span
            className="icon"
            onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit);
              }
            }}
          >
            <GrEdit />
          </span>
          <span className="icon" onClick={() => handleDone(todo.id)}>
            <MdDoneAll />
          </span>
          <span className="icon" onClick={() => handleDelete(todo.id)}>
            <RiDeleteBin6Line />
          </span>
        </div>
      </form>
    </>
  );
};

export default SingleTodo;
