import React from "react";
import "./styles.scss";
import Empty from "./Empty";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => {
      transition(ERROR_SAVE, true)
    })
  }

  function onDelete() {
    props.cancelInterview(props.id)
    .then(transition(DELETING))
    .then(() => transition(EMPTY))
    .catch(() => {
      transition(ERROR_DELETE, true)
    })
  }

  function onEdit() {
    transition(EDIT)
  }
  
  function onConfirm() {
    transition(CONFIRM)
  }

  function onClose() {
    back(SHOW)
  }
  return (
  <article data-testid="appointment" className="appointment">
    <Header time={props.time} />
      {mode === EMPTY && <Empty 
      onAdd={() => transition(CREATE)}
      />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => onConfirm()}
          onEdit={() => onEdit()}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="SAVING" />}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment" onClose={onClose}/>}
      {mode === ERROR_SAVE && <Error message="Could not save your appointment" onClose={onClose} />}
      {mode === DELETING && <Status message="DELETING" />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onCancel={() => back()} 
      onConfirm={() => onDelete()} />}
      {mode === EDIT && (
      <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
      />
      )}
  </article>)
}