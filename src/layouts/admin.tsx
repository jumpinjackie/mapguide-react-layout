import * as React from "react";
import * as block from "bem-cn";
import { bind }  from "decko";
import { connect } from "react-redux";

import * as Constants from "../constants";
import Admin from "../components/admin";


export class AdminLayout extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
   
    render(): JSX.Element {
        const { } = this.props;
        
        return <div>
            <Admin />
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