import * as React from "react";
import * as block from "bem-cn";
import { bind }  from "decko";
import { connect } from "react-redux";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table/dist/react-bootstrap-table.js';

export class DataTable extends React.Component<any, any> {

  render():any {
    const b = block('data-table');
    const { data } = this.props;
      return (
        <div className={b()}>
        { data &&
          <BootstrapTable data={data} striped hover>
              <TableHeaderColumn isKey dataField='id'>Id</TableHeaderColumn>
              <TableHeaderColumn dataField='name'>Наименовани</TableHeaderColumn>
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