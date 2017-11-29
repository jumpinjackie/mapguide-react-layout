import * as React from "react";
import * as block from "bem-cn";
import { bind }  from "decko";
import { connect } from "react-redux";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table/dist/react-bootstrap-table.js';

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  onEditableRows: function() {
    // if product id less than 3, will cause the whole row noneditable
    // this function should return an array of row keys
    return products.filter(p => p.id < 3).map(p => p.id);
  }
};

export class DataTable extends React.Component<any, any> {

  render():any {
    const b = block('data-table');
    const { data } = this.props;
      return (
        <div className={b()}>
        { data &&
          <BootstrapTable data={data} striped hover cellEdit={ cellEditProp } insertRow={ true }>
              <TableHeaderColumn isKey dataField='id'>Id</TableHeaderColumn>
              <TableHeaderColumn dataField='name'>Наименование</TableHeaderColumn>
              <TableHeaderColumn dataField='type'>Тип</TableHeaderColumn>
          </BootstrapTable>
        }
      </div>);
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

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);