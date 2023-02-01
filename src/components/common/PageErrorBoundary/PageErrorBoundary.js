import { Component } from "react";
import GlobalContext from "../Context";
import { withRouter } from "react-router-dom";
import * as constants from "../../../constants";

class ErrorBoundary extends Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      const { optionState, setOptionState } = this.context;
      console.log("error boundary", optionState, this.props.location);

      // If the user is on home, use optionstate,
      // otherwise use history to go to error page
      this.props.location.pathname === constants.DB_LINK
        ? setOptionState((prev) => ({
            nav: "error",
            from: prev?.nav,
            error: this.state.error,
          }))
        : this.props.history.push(constants.ERROR_PATH, {
            fromNav: optionState.nav,
            fromLocation: this.props.location.pathname,
            error: this.state.error,
          });
      return null;
    }
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
