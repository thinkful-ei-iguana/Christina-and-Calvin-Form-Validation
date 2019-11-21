//make component AddFolder which creates a form which takes a single item and sends it via endpoint
//to the server (ensure any errors are handled) add a button to invoke the form
import React, { Component } from "react";

class AddFolder extends Component {
  // export default addFolder = event => {
  state = { fldr: { value: "" } };
  setFldr = fldr => {
    this.setState({ fldr: { value: fldr } });
  };
  // e.preventDefault()
  render() {
    const { addFolder } = this.props;
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            const oisdv = { name: e.target.name.value };
            fetch(`http://localhost:9090/folders`, {
              method: "POST",
              body: JSON.stringify(oisdv),
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
                addFolder(json);
              });
          }}
        >
          <label htmlFor="inputId" className="folderLabel">
            New Folder:
          </label>
          <input id="inputId" type="" name="name" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default AddFolder;
