import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import Todo from "./Todo";
import db from "../config/firebase";
import firebase from "firebase";

function Form() {
  const [todos, setTodos] = useState([]); //useState is a short term memory
  const [input, setInput] = useState("");

  //when the app loads we need to listen to the database & fetch new todos as they get add or remove
  useEffect(() => {
    //this code will fire.... when app.js loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // => onSnapshot(take a picture of whole collection ) => snapshot store docs which store data => data is array of object => then we need to fetch particular property
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, text: doc.data().text }))
        );
      });
  }, []); // this empty array is dependency of this useEffect

  const addTodo = (event) => {
    //This event will fire off when someone click the button
    event.preventDefault();
    db.collection("todos").add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput(""); // clear the input field after click the button
  };

  return (
    <div>
      <h1>Todo App</h1>
      <form>
        <TextField
          id="filled-basic"
          label="Write Here ✍️ :)"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        ></TextField>
        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
          onClick={addTodo}
        >
          Add Todo
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo text={todo} />
        ))}
      </ul>
    </div>
  );
}

export default Form;
