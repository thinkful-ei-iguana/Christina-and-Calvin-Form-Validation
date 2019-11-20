import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Note.css";

export default function Note(props) {
  //needs to delete targeted note from API
  //need to convert to class
  //need to add delete method to fetch
  //add variable url endpoint
  //modify .then

  deleteAction = e => {
    e.preventDefault();
    fetch(`http://localhost:9090/notes`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then(data => {
        this.setState({ deleteAction: [] });
        //console.log(data);
        //console.log(this.state.notes);
      })
      .catch(e => console.log(e));
  };

  return (
    <div className="Note">
      <h2 className="Note__title">
        <Link to={`/note/${props.id}`}>{props.name}</Link>
      </h2>
      <button
        className="Note__delete"
        onClick={this.deleteAction}
        type="button"
      >
        <FontAwesomeIcon icon="trash-alt" /> remove
      </button>
      <div className="Note__dates">
        <div className="Note__dates-modified">
          Modified{" "}
          <span className="Date">{format(props.modified, "Do MMM YYYY")}</span>
        </div>
      </div>
    </div>
  );
}
