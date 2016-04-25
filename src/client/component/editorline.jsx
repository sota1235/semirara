import React, {Component} from "react";
import ReactDOM from "react-dom";

import LongPress from "./longpress";
import compile from "./syntax";
import UserIcon from "./usericon";
import Code from "./code";

export default class EditorLine extends Component{

  constructor(){
    super();
    this.focusInput = this.focusInput.bind(this);
  }

  static get propTypes(){
    return {
      line: React.PropTypes.object.isRequired,
      showUser: React.PropTypes.bool,
      edit: React.PropTypes.bool,
      onStartEdit: React.PropTypes.func,
      onChange: React.PropTypes.func,
      onKeyDown: React.PropTypes.func,
      onPaste: React.PropTypes.func
    };
  }

  render(){
    const {line} = this.props;
    if(this.props.edit){
      return (
        <input
           ref="input"
           value={this.props.line.value}
           onChange={e => this.props.onChange(e.target.value)}
           onClick={e => e.stopPropagation()}
           onKeyDown={this.props.onKeyDown}
           onPasteCapture={this.props.onPaste}
          />
      );
    }
    else{
      const icon = this.props.showUser ? <UserIcon id={this.props.line.user} size={20} /> : null;
      let elm;
      if(this.props.line.codestart){
        elm = <span className="codestart">{this.props.line.lang}</span>;
      }
      else if(this.props.line.lang){
        elm = <Code lang={this.props.line.lang} code={this.props.line.value} />;
      }
      else if(line.cli){
        elm = (
          <span className="cli">
            <span className="prefix">{line.cli.prefix}</span>
            {" "}
            <span>{line.cli.command}</span>
          </span>
        );
      }
      else{
        elm = compile(this.props.line.value);
      }
      return (
        <span>
          <LongPress onLongPress={this.props.onStartEdit}>
            {elm}
          </LongPress>
          {icon}
        </span>
      );
    }
  }

  componentDidUpdate(){
    this.focusInput();
  }

  componentDidMount(){
    this.focusInput();
  }

  focusInput(){
    if(!this.props.edit) return;
    ReactDOM.findDOMNode(this.refs.input).focus();
  }

}
