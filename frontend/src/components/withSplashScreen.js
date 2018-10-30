import React, {Component} from 'react';
import auth0Client from '../Auth';

function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
        await auth0Client.loadSession();
      } catch (err) {
        console.log(err);
      }
      this.setState({
        loading: false,
      });
    }

    render() {
      // while checking user session, show "loading" message
      if (this.state.loading) return <h1>Loading App</h1>;

      // otherwise, show the desired route
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withSplashScreen;
