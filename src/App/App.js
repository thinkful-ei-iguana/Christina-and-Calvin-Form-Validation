//two forms for POSTing new folders and new Notes to the server
//refactor components to use PropTypes to validate props

//make component AddFolder which creates a form which takes a single item and sends it via endpoint
//to the server (ensure any errors are handled) add a button to invoke the form

//create component AddNote which implements (name, content, folderId), submit to endpoint /notes
//add validation to the note, make sure it has a name, the folder should be selected from a list of
//existing folders, ensure the errors are handled, add a button to invoke note adding

//define error boundary component, add this component to specific points in your component structure

//review each components you've built so far, make sure any component that receives props from its parents
//that it receives PropType validation

import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
// import dummyStore from "../dummy-store";
import { getNotesForFolder, findNote, findFolder } from "../notes-helpers";
import "./App.css";
import noteContext from "../NoteContext";
import AddFolder from "../AddingFolder/AddFolder";
import AddNote from "../AddingNote/AddNote";

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    //this will be the fetch requests being stored in the dummystate, populating notes/folders

    fetch(`http://localhost:9090/notes`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then(data => {
        this.setState({ notes: [...data] });
      })
      .catch(e => console.log(e));

    fetch(`http://localhost:9090/folders`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then(data => {
        this.setState({ folders: [...data] });
      })
      .catch(e => console.log(e));
  }

  handleAddNote = newNote => {
    console.log(newNote);
    this.setState({
      notes: [...this.state.notes, newNote]
    });
  };

  handleAddFolder = fldr => {
    this.setState({
      folders: [...this.state.folders, fldr]
    });
  };

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  renderNavRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => (
              <NoteListNav folders={folders} notes={notes} {...routeProps} />
            )}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    const { notes } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = getNotesForFolder(notes, folderId);
              return <NoteListMain {...routeProps} notes={notesForFolder} />;
            }}
          />
        ))}
        <Route
          exact
          path="/add-folder"
          render={routeProps => {
            return (
              <AddFolder addFolder={this.handleAddFolder} {...routeProps} />
            );
          }}
        />
        <Route
          exact
          path="/add-note"
          render={routeProps => {
            return (
              <AddNote
                addNote={this.handleAddNote}
                {...routeProps}
                folders={this.state.folders}
              />
            );
          }}
        />
        <Route
          path="/note/:noteId"
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePageMain {...routeProps} note={note} />;
          }}
        />
      </>
    );
  }

  render() {
    return (
      <div className="App">
        <noteContext.Provider
          value={{
            folders: this.state.folders,
            notes: this.state.notes,
            deleteNote: this.handleDeleteNote
          }}
        >
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </noteContext.Provider>
      </div>
    );
  }
}

export default App;
