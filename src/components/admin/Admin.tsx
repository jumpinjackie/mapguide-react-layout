import * as React from "react";
import * as block from "bem-cn";
import { bind }  from "decko";
import { connect } from "react-redux";
import { typeTab } from "./data/typeTab";
import { Nav, NavItem } from 'react-bootstrap';

import * as Constants from "../../constants";

interface IState {
  activeTab: number;
}

export class AdminLayout extends React.Component<any, IState> {
  public state: IState = {
    activeTab: typeTab.userTab,
  }
  
  @bind
  handleSelect(selectedKey: any) {
    // alert(`selected ${selectedKey}`);
    this.setState({
      activeTab: selectedKey
    });
  }

  render(): JSX.Element {
    const b = block('admin');  
    const { } = this.props;
    const { activeTab } = this.state;
      let layout = null;
      switch (activeTab) {
        case typeTab.userTab:
          layout = <div>юзеры</div>
          break;
        case typeTab.roleTab:
          layout = <div>Пользователи</div>
          break;
        case typeTab.atributeTab:
          layout = <div>Атрибутивное описание</div>
          break;
      
        default:
          layout = <div>юзеры</div>
          break;
      }
      return <div className={b()}>
          <Nav bsStyle="tabs" justified activeKey={activeTab} onSelect={this.handleSelect}>
            <NavItem eventKey={typeTab.userTab}>Пользователи</NavItem>
            <NavItem eventKey={typeTab.roleTab} >Роли</NavItem>
            <NavItem eventKey={typeTab.atributeTab}>Атрибутивное описание</NavItem>
          </Nav>
          {layout}
      </div>;
  }
}

function mapStateToProps(state: any): any {
  return {
    isAuth: state.auth.isAuth,
  };
}

function mapDispatchToProps(dispatch: any): any {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);