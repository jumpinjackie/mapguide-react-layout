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

interface IState {
  login: string;
  password: string;
}

export class Auth extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            login: '',
            password: '',
        };
    }

    @bind
    handlerAuthClick() {
      const { login, password } = this.state;
      console.log(login, password)
    }

    @bind
    onInputChange(e: any) {
      const { value, name } = e.currentTarget;
      const newState: any = {};
      newState[name] = value;
      this.setState(newState);
    }

    render(): any {
      const b = block('auth');
      const { login, password } = this.state;
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
              <input value={login} name="login" onChange={this.onInputChange} className={b('input')()} type="text" placeholder='Логин' />
              <input value={password} name="password" onChange={this.onInputChange} className={b('input')()} type="password" placeholder='Пароль' />
              <button className={b('auth-btn')()} onClick={this.handlerAuthClick}>Войти</button>
            </div>
          </Modal>
        </div>
      )
    }
}

export default Auth;