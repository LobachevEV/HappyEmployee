import React, {Component} from "react";
import BladeElement from "./BladeElement";
import Blade from "./Blade";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../../store/Employees";

class BladePanel extends Component<any> {
  render() {
    const modals = this.props.blades.map((item: any, i: number) => <BladeElement key={i}>
      <Blade title={this.props.title} onClose={() => this.props.closeModal(item)}/>
    </BladeElement>);
    return (
      <div className={modals.length > 0 ? "modals" : ""}>
        {modals}
      </div>
    );
  }
}

export default connect<any>(
  (state: any) => state.blades,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(BladePanel)