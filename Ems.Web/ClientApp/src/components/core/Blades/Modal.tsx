import React, {Component} from "react";

export class Modal extends Component<{ item: { type: string, text: string, content: any, onClose: () => any, onConfirm: () => any }, onClose: (item: any) => any, onConfirm: (item: any) => any }> {
  onClose() {
    if (this.props.item.onClose) {
      this.props.item.onClose();
      this.props.onClose(this.props.item);
    } else {
      this.props.onClose(this.props.item);
    }
  }

  onConfirm() {
    if (this.props.item.onConfirm) {
      this.props.item.onConfirm();
      this.props.onClose(this.props.item);
    }
  }

  render() {
    const {type} = this.props.item;
    if (type === 'confirmation') {
      const {text} = this.props.item;
      return (
        <div className="modal-wrapper">
          <div className="modal">
            <div className="text">{text}</div>
            <div className="buttons">
              <button className="modal-button" onClick={() => this.onConfirm()}>Confirm</button>
              <button className="modal-button" onClick={() => this.onClose()}>Close</button>
            </div>
          </div>
        </div>
      )
    } else if (type === 'custom') {
      const {content} = this.props.item;
      return (
        <div className="modal-wrapper">
          <div className="modal">
            <button className="close" onClick={() => this.onClose()}>&times;</button>
            {content}
          </div>
        </div>
      )
    }
    return (
      <div/>
    );
  }
}