import React from 'react';
// import { Button } from 'react-bootstrap';
import PageContainer from '../components/PageContainer';
// import Message from '../components/Message';
// Home page component

const Home = () => (
  <div id="home">
    <PageContainer>
      <h1>Marvin</h1>
    </PageContainer>
  </div>
);

/*
class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHide = this.handleHide.bind(this);

    this.state = {
      showMessage: false,
    };
  }

  render() {
    let message = null;
    if (this.state.showMessage) {
      message = <Message type="success" message="Questo è per te!" />;
    }
    return (
      <div id="home">
        <PageContainer>
          <h1>Marvin</h1>
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={() => this.setState({ showMessage: true })}
          >
            View message
          </Button>
          {message}
        </PageContainer>
      </div>
    );
  }
}

*/
export default (Home);
