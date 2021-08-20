import React from "react";
import InputField from "./components/InputField";
import "./style/App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <span className="heading">To Do List</span>
      <InputField />
    </div>
  );
};

export default App;
