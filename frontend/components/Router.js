import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import { createBrowserHistory } from "history";


export const history = createBrowserHistory();

export class BrowserRouter extends React.Component {
  render() {
    return <Router history={history} children={this.props.children} />;
  }
}
