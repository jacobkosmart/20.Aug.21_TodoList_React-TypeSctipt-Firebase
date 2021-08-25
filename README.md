# 📔 TodoList-DnD App

<a href="https://todo.jacobko.info/" target="_blank">Live Demo</a>

![Animation1](https://user-images.githubusercontent.com/28912774/130744544-a6e5951b-d804-4de4-921e-34295ab82961.gif)

## 💻 1.프로젝트 소개

### 📝 사용기술 및 언어

- Create React App with TypeScript

- React Beautiful Dnd

- Sass

- PWA

- React Icons

### ⏰ 개발 기간

2021-08-09 ~ 2021-08-13

## 📃 2.프로젝트 내용

### 📌 주요 기능

- TodoList CRUD

- 2개의 Category (To do, Completed) 의 task box 가 drag and drop 가능 (list order 도 변경 가능)

- localStorage 에 DB 저장

- PWA 앱 배포 (모바일, 데스크탑 어플 사용가능)

- Fully responsive web design

### 🎁 설치 패키지

```bash
# CRA
npx create-react-app PROJECT --template typescript

# node-sass
yarn add node-sass@4.14.1

# React icons
yarn add react-icons

# react-beautiful-dnd
yarn add react-beautiful-dnd
yarn add @types/react-beautiful-dnd
```

## 🔎 3.주요 코드

### A.CRUD with react hooks

```ts
// App.tsx

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

// in SingleTodo.tsx

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
  const ok = window.confirm("Are you sure delete the task?");
  if (ok) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
};
```

### B. React beautiful-dnd

```tsx
// App.tsx

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




// in ToDoList.tsx
// Droppable 범위 설정

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

```

### C.PWA

> PWA 만들기 과정 및 관련 내용 (Jacob's DevLog) - [https://jacobko.info/pwa/pwa/](https://jacobko.info/pwa/pwa/)

## 💡 4. Reference

Type Reference - [https://flow.org/en/docs/react/types/](https://flow.org/en/docs/react/types/)

react-beautiful-dnd Github - [https://github.com/atlassian/react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)

React Drag and Drop Tutorial - [https://www.youtube.com/watch?v=uEVHJf30bWI](https://www.youtube.com/watch?v=uEVHJf30bWI)
