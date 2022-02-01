import React, { Component } from "react";
import NameTagList from "./NameTagList.js";
import UserInput from "./UserInput.js";

class App extends Component {
  state = {
    names: []
  };
  addName = (name) => {
    const newNames = [name, ...this.state.names];
    this.setState({ names: newNames });
  };
  removeName = (clickedIndex) => {
    // to learn how the .filter method works, check out https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    const filterCallback = (_, index) => index !== clickedIndex;
    const newNames = this.state.names.filter(filterCallback);
    this.setState({ names: newNames });
  };
  // To save the names array, write an empty componentDidUpdate
  // The names array needs to be stringified before writing it to
  // local storage. Below savedNameString in the componentDidUpdate
  // method, save state to local storage, naming it ‘savedNames’.
  componentDidUpdate() {
    const savedNamesString = JSON.stringify(this.state.names);
    localStorage.setItem("savedNames", savedNamesString);
  }

  // Write a componentDidMount method to read from local storage.
  // In the componentDidMount method, write a variable called
  // savedNamesString that pulls the ‘savedNames’ data from local
  // storage. Write an “if” statement that checks to see if
  // savedNamesString exists in local storage. Inside of the “if”
  // statement, you need to parse the stringified version of the
  // names array. Set the state of names to savedNames.
  componentDidMount() {
    const savedNamesString = localStorage.getItem("savedNames");
    if (savedNamesString) {
      const savedNames = JSON.parse(savedNamesString);
      this.setState({ names: savedNames });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Name Tag Generator</h1>
        <UserInput addName={this.addName} />
        <NameTagList names={this.state.names} removeName={this.removeName} />
      </div>
    );
  }
}

export default App;
