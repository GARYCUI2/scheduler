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
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const SAVING = "SAVING";
const DELETE = "DELETING";
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // function for delete interview
  function destroy() {
   
    transition(DELETE,true)
    Promise.resolve(props.cancelInterview(props.id))
      .then(()=>transition(EMPTY))
      .catch(() => {
        transition(ERROR_DELETE, true)
      })
  }


   // this is the function passed into Form component onSave property for mode CREATE
   function save(name, interviewer) {
     // user did not pick interviewer and try to save
    if (interviewer === null) {
      transition(ERROR_SAVE, true);
      return;
    }

    const interview = {
      student: name,
      interviewer
    }

    transition(SAVE,true)
    
    Promise.resolve(props.bookInterview(props.id, interview))
      .then(()=>transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
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
          onEdit={() => transition(EDIT)}
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

      {mode === CONFIRM && <Confirm message={'Are you sure to delete?'} onConfirm={destroy} onCancel={() => back(SHOW)}/>}

      {mode === EDIT &&
        <Form 
          name={props.interview.student} 
          onSave={(name, interviewer) => save(name, interviewer)} 
          onCancel={back} 
          interviewer={props.interview.interviewer.id} 
          interviewers={props.interviewers}
        />
      }

      {mode === ERROR_SAVE &&
        (props.interview ?
          <Error message="Error on save! Please try again" onClose={back}/> :
          <Error message="Error on save! Please try again" onClose={back}/>
        )
      } 
      {mode === ERROR_DELETE &&
        <Error message="Error on delete! Please try again" onClose={() => transition(SHOW)}/>
      }      
    </article>    
  );
}

