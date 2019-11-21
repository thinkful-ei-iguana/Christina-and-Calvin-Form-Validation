//make component AddFolder which creates a form which takes a single item and sends it via endpoint
//to the server (ensure any errors are handled) add a button to invoke the form
import React, { Component } from "react";


class addFolder extends Component{
// export default addFolder = event => {
    
    e.preventDefault()
    render() {
        return (
            <div>
                <form>
                <input type="submit" value="Submit" />
                <label>
                    Name: <input type="text" name="name" />
                </label>
                </form>
            </div>
        );
      }
};
