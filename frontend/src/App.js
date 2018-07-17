import React, { Component } from "react";
import { Provider } from "react-redux";

import store from "./redux/store";
import PageContainer from "./components/PageContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <PageContainer />
        </Provider>
      </div>
    );
  }
}

export default App;
