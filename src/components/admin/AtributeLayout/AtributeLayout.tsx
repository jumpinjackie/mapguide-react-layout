import * as React from "react";
import * as block from "bem-cn";
import { bind }  from "decko";
import { connect } from "react-redux";
import DataTable from "./DataTable";

import "./AtributeLayout.css";

interface IData {
  name: string;
  type: string;
}

interface IAtributiveList {
  id: string;
  name: string;
  data: IData[];
}
const atributiveList: IAtributiveList[] = [
  {
    id: 0,
    name: "Дороги",
    data: [
      { id: 1, name: "M52", type: "Федеральная трасса" },
      { id: 2, name: "P161", type: "Федеральная трасса" },
      { id: 3, name: "Томск-Асино", type: "Межгородская" },
    ]
  },

  {
    id: 1,
    name: "Здания",
    data: [
      { id: 1, name: "Мэрия", type: "Муниципалитет" },
      { id: 2, name: "Гимназия45", type: "Федеральное здание" },
      { id: 3, name: "Чехов", type: "Памятник" },
    ]
  },

  {
    id: 2,
    name: "Учебные заведения",
    data: [
      { id: 1, name: "ТУСУР", type: "Университет" },
      { id: 2, name: "Лицей45", type: "Школа" },
      { id: 3, name: "Кванториум", type: "Дошкольное учреждение" },
    ]
  },
];

interface IState {
  atributiveData: IAtributiveList;
}


export class AtributeLayout extends React.Component<any, IState> {
  public state: Istate {
    activeDataID: 0;
  }

  @bind
  handlerDataItemClick(e) {
    this.setState({
      activeDataID: +e.currentTarget.value,
    })
  }

  render(): JSX.Element {
    const b = block('atribute-layout');
    const { activeDataID } = this.state;

    const list = atributiveList.map(field => {
      const isActive = field.id === activeDataID;
      return <button className={b('item', {isActive})()} onClick={this.handlerDataItemClick} value={field.id}>{field.name} </button>;
    });
    return <div className={b()}>
      <div className={b('position', {left: true})()}>{list}</div>
      <div className={b('position', {right: true})()}><DataTable data={atributiveList[activeDataID].data}/></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AtributeLayout);