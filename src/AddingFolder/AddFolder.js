//make component AddFolder which creates a form which takes a single item and sends it via endpoint
//to the server (ensure any errors are handled) add a button to invoke the form
import React, { Component } from "react";

class addFolder extends Component {
  // export default addFolder = event => {
  state = { fldr: { value: "" } };
  setFldr = fldr => {
    this.setState({ fldr: { value: fldr } });
  };
  // e.preventDefault()
  render() {
    return (
      <div>
        <form>
          <input
            id="addFldr"
            type="text"
            value={this.state.addFldr.value}
            onChange={e => {
              this.setFldr(e.target.value);
            }}
          />
          <label>
            FolderName: <input type="text" name="name" />
          </label>
        </form>
      </div>
    );
  }
}
export default addFolder;
