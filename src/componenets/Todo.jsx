import React, { useState } from "react";
import {
  Button,
  List,
  makeStyles,
  ListItem,
  ListItemText
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import db from "../config/firebase";
import "./style.css";
import { TextField } from "@material-ui/core";
import Modal from "react-modal";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}));

Modal.setAppElement("#root");
function Todo(props) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const { text, id } = props.text;

  const updateTodo = () => {
    db.collection("todos").doc(text).set(
      {
        text: input
      },
      { merge: true }
    );
    setModalOpen(false);
  };
  return (
    <>
      <List>
        <ListItem>
          <ListItemText primary={text} secondary="⏰" />
          <Button
            onClick={(event) => {
              db.collection("todos").doc(id).delete();
            }}
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button
            onClick={() => setModalOpen(true)}
            variant="outlined"
            color="primary"
          >
            Edit
          </Button>
          <div className="modal">
            <Modal
              isOpen={modalOpen}
              onRequestClose={() => {
                setModalOpen(false);
              }}
              shouldCloseOnOverlayClick={() => {
                setModalOpen(false);
              }}
              shouldCloseOnEsc={true}
              style={{
                overlay: {
                  backgroundColor: "#aba9a4"
                },
                content: {
                  color: "orange",
                  position: "absolute",
                  height: "250px",
                  width: "650px",
                  fontFamily: "Josefin Sans",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "20px",
                  margin: "70px",
                  boxShadow:
                    "rgba(80, 255, 0, 0.23) 0px 4px 8px 0px, rgb(96, 92, 92) 0px 6px 20px 0px",
                  textAlign: "center"
                }
              }}
            >
              <div className="modal-content">
                <h3>{text}</h3>
                <TextField
                  id="outlined-basic"
                  placeholder={text}
                  variant="outlined"
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={updateTodo}
                  className="upButton"
                >
                  Update
                </Button>
              </div>
            </Modal>
          </div>
        </ListItem>
      </List>
    </>
  );
}

export default Todo;
