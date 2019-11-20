import React from "react";

const noteContext = React.createContext({
  folders: ["folders test"],
  notes: ["notes test"],
  deleteNote: () => {}
});

export default noteContext;
