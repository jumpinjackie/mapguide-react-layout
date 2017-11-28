import * as React from "react";
import * as Modal from 'react-modal';
import * as block from "bem-cn";
import { bind }  from "decko";

import '../styles/auth.css';
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(19,19,19,0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#f8f8f8',
    minWidth: '323px',
    overflow: 'hidden',
  },
};

export class Auth extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
        this.state = {
            login: '',
            pasword: '',
        };
    }

    @bind
    handlerAuthClick() {
      console.log('click')
    }
    render(): any {
      const b = block('auth');
      return (
        <div className={b()}>
          <Modal
            isOpen={true}
            shouldCloseOnOverlayClick={false}
            style={customStyles}
            contentLabel="No Overlay Click Modal"
          >
            <div className={b('content')()}>
              <h1>Авторизация</h1>
              <input className={b('input')()} type="text"/>
              <input className={b('input')()} type="password"/>
              <button className={b('auth-btn')()} onClick={this.handlerAuthClick}>Войти</button>
            </div>
          </Modal>
        </div>
      )
    }
}

export default Auth;