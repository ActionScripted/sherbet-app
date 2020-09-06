
/**
 * App
 * ---
 */

import React from 'react';


const initialState = {
  onUnloadChecks: [],
};


export default class App extends React.Component {
  constructor(props) {
    super(props);

    // Window
    this.onUnload = this.onUnload.bind(this);
    // State
    this.state = {...initialState};
  }

  /**
   * Component added to tree.
   * Runs once.
   */
  componentDidMount() {
    window.addEventListener('beforeunload', this.onUnload);
  }

  /**
   * Component queued for removal from tree.
   * Runs once.
   */
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload);
  }


  /**
   * App-level unload; runs checks (if any).
   * Keep people from losing changes, mostly.
   * Or do other evil stuff.
   */
  onUnload(evt) {
    if (this.state.onUnloadChecks.length > 0) {
      let blockUnload = false;

      // Check our checks
      this.state.onUnloadChecks.forEach(unloadCheck => {
        if (unloadCheck()) blockUnload = true;
      });

      if (blockUnload) {
        // Per the spec, prevent default
        evt.preventDefault();
        // Older browsers and chrome need this
        evt.returnValue = 'You have unsaved changes! Are you sure you want to leave?';
      }
    }
  }


  /**
   * THE MAIN EVENT (well...not an event).
   */
  render() {
    return (
      <>
        <h1>App (React)</h1>
        <p>Hello, I'm the app.</p>
      </>
    )
  }
}
