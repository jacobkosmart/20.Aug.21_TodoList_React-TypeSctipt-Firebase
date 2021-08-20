import React from "react";
import "../style/InputField.scss";

const InputField = () => {
  return (
    <>
      <form className="input">
        <input
          type="text"
          placeholder="Enter your task"
          className="input__box"
        />
        <button className="input__submit" type="submit">
          Go
        </button>
      </form>
    </>
  );
};

export default InputField;
