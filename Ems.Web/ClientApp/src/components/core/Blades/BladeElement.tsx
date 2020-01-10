import React from "react";
import ReactDOM from "react-dom";

export default class BladeElement extends React.PureComponent<any> {
  el: any;

  constructor(props: any) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}