import React from "react";
import "./styles.scss";
import Empty from "./Empty";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  console.log("props: ", props)
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
    .catch(err => console.log(err.message));
  }

  function onDelete() {
    props.cancelInterview(props.id)
    .then(transition(DELETING))
    .then(() => transition(EMPTY))
    .catch(err => console.log(err.message))
  }

  function onEdit() {
    transition(EDIT)
  }
  
  function onConfirm() {
    transition(CONFIRM)
  }

  return (
  <article className="appointment">
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
          // name={props.name}
          // value={props.name}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="SAVING" />}
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