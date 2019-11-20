import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Note.css";
import noteContext from "./NoteContext";

export default class Note extends React.Component {
  static contextType = noteContext;
  //needs to delete targeted note from API
  //modify .then

  deleteAction = e => {
    e.preventDefault();
    fetch(`http://localhost:9090/notes/${this.props.id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then(data => {
        this.context.deleteNote(this.props.id);
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${this.props.id}`}>{this.props.name}</Link>
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
            <span className="Date">
              {format(this.props.modified, "Do MMM YYYY")}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
