// import Appointment from "components/Appointment";
import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const SAVING = "SAVING";
const DELETE = "DELETING";
const CONFIRM = 'CONFIRM';

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // function for delete interview
  function deleteInterview() {
   
    transition(DELETE)
    Promise.resolve(props.cancelInterview(props.id))
      .then(()=>transition(EMPTY))
      .catch(err => console.log(err))
  }


   // this is the function passed into Form component onSave property for mode CREATE
   function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }

    transition(SAVE)
    Promise.resolve(props.bookInterview(props.id, interview))
      .then(()=>transition(SHOW))
      .catch(err => console.log(err))
  }




  return ( 
    <article className='appointment'>
        <Header time={props.time} />
        
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

        {mode === SAVE && <Status message={SAVING} />} 

        {mode === SHOW &&  (
          <Show
            student={props.interview.student} 
            interviewer={props.interview.interviewer.name}
            onDelete={() => transition(CONFIRM)}
            />
          )
        }

        {mode === CREATE && (
            <Form
              interviewers={props.interviewers}
              onCancel={() => back(EMPTY)}
              onSave={save}
              
          
            />
        )}

        {mode === DELETE && <Status message={'Deleting'} />}

        {mode === CONFIRM && <Confirm message={'Are you sure to delete?'} onConfirm={deleteInterview} onCancel={() => back(SHOW)}/>}

    </article>
        
  );
}

