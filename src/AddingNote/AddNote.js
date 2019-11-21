//make component AddFolder which creates a form which takes a single item and sends it via endpoint
//to the server (ensure any errors are handled) add a button to invoke the form

//name, modified, folderId, content
import React, { Component } from "react";
import PropTypes from "prop-types";

class AddNote extends Component {
  // export default addFolder = event => {
  state = { newNote: { value: "" } };
  setNote = newNote => {
    this.setState({ newNote: { value: newNote } });
  };

  validateName = () => {
    let newNote = this.state.newNote.value;
    newNote = newNote.replace("");
    // /[\s-]/g
    if (newNote.length === "") {
      return "Note title must be at least 3 characters long";
    } else if (newNote) {
      // !/^\d+$/.test
      return;
    }
  };

  render() {
    const { addNote } = this.props;
    const options = this.props.folders.map(folder => (
      <option value={folder.id}>{folder.name}</option>
    ));
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            const fancyNote = {
              name: e.target.name.value,
              modified: new Date(),
              folderId: e.target.folderId.value,
              content: e.target.folderId.value
            };
            fetch(`http://localhost:9090/notes`, {
              method: "POST",
              body: JSON.stringify(fancyNote),
              headers: { "Content-Type": "application/json" }
            })
              .then(res => {
                if (res.ok) {
                  return res.json();
                } else {
                  throw new Error(res.statusText);
                }
              })

              .then(json => {
                console.log(json);
                addNote(json);
              });
          }}
        >
          <label htmlFor="inputId" className="noteLabel">
            New Note:
          </label>
          <input required id="inputId" type="text" name="name" />
          <input required id="content" type="textarea" name="content" />
          <button type="submit">Submit</button>
          <select name="folderId">{options}</select>
        </form>
      </div>
    );
  }
}

AddNote.propTypes = {
  addNote: PropTypes.func,
  folders: PropTypes.array
};

export default AddNote;
