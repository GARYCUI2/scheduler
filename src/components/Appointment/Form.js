import React, { useState } from 'react';

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent('');
    setInterviewer(null);
  }
  const cancel = () => {
    reset();
    props.onCancel(student, interviewer);
  }

  const validate = () => {
    setError("");
    if (student === "") {
      setError("student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("interviewer name cannot be blank");
      return;
    }

    props.onSave(student, interviewer);
  }

  return ( 
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            student={props.student}
            interviewer={props.interviewer}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation" data-testid="error-msg">{error}</section>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={(interviewerID) => setInterviewer(interviewerID)}
          
        />
      </section>
      <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onClick= {cancel}>Cancel</Button>
            <Button confirm onClick= {validate}>Save</Button>
          </section>
      </section>
    </main>
  );
}