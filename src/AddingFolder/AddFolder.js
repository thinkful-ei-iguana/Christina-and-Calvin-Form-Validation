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
    const { addFolder } = this.props
    return (
      <div>
        <form onSubmit={
          addFolder
         }>
          <input
            id="fldr"
            type="text"
            value={this.state.fldr.value}            
          />
          <label className="folderLabel">
            New Folder: <input type="" name="name" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default AddFolder;
