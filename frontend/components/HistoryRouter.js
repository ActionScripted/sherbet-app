import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";


export const history = createBrowserHistory();

export class HistoryRouter extends BrowserRouter {
  history = history;
}
