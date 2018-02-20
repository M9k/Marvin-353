import React from 'react';
// TODO: capire il modo migliore di fare gli import per favorire i test
import { store } from '../../store';
import { userAction } from '../../reducers/user';

class Logging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
    };
  }

  componentDidMount() {
    console.log('Inizio login');
    store.dispatch({ type: userAction.USER_TRY_LOGIN });
  }

  render() {
    if (this.state.isGoing) {
      return (
        <div>
          Loading
        </div>
      );
    }
    // se non sta più cercando di effettuare il login torna alla home
    window.location.replace('/');
    // TODO completare
    return (<div>Se non vieni rediretto alla home entro tot clicka qui: link alla home</div>);
  }
}

export default Logging;
