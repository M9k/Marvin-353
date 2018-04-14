import React from 'react';
import { Button } from 'react-bootstrap';
import PageContainer from '../components/PageContainer';
import MessageBox from '../components/Message';
import CardWithIcon from '../components/CardWithIcon';

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
    const links = [
      {
        path: 'courses',
        label: 'Manage courses',
      },
      {
        path: 'confirmteacher',
        label: 'Confirm Teachers',
      },
    ];
    return (
      <div id="home">
        <PageContainer>
          <h1>Marvin</h1>
          <CardWithIcon links={links} title="Manage admin" text="Manage admin card with icon" icon="user" />
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

/*
          <Button
            bsStyle="primary"
            onClick={() => this.setState({ showMessage: true })}
          >
            View message
          </Button>
          */

export default (Home);
