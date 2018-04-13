import React from 'react';
import { Button } from 'react-bootstrap';
import PageContainer from '../components/PageContainer';
import MessageBox from '../components/Message';

// Home page component
class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showMessage: false,
    };
  }
  render() {
    const closeMessage = () => this.setState({ showMessage: false });
    return (
      <div id="home">
        <PageContainer>
          <h1>Marvin</h1>
          <Button
            bsStyle="primary"
            onClick={() => this.setState({ showMessage: true })}
          >
            View message
          </Button>
        </PageContainer>
        <MessageBox show={this.state.showMessage} onHide={closeMessage} type="success" message="Message box!" />
      </div>
    );
  }
}
export default (Home);
