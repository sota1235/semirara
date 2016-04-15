import React from "react";
import {Component, getStore} from "../store";
const store = getStore();
import compile from "../syntax";
import EditorLine from "./editorline";
import {clone} from "../../server/src/lib/diffpatch";

export default class Editor extends Component {

  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
    this.updateLine = this.updateLine.bind(this);
    this.stopEdit = this.stopEdit.bind(this);
    this.startEdit = this.startEdit.bind(this);
  }

  mapState(state){
    return {page: state.page, user: state.user};
  }

  render(){
    this.debug("render()");
    const lines = Object.keys(this.state.page.lines).map(i => {
      let line = this.state.page.lines[i];
      return (
        <li>
          <EditorLine
             value={line}
             edit={this.state.editline === i}
             onStartEdit={e => { e.stopPropagation(); this.startEdit(i); }}
             onValueChange={value => this.updateLine(i, value)}
             />
        </li>
      );
    });
    return (
      <div className="editor" onClick={this.stopEdit}>
        <h1>editor</h1>
        <ul>{lines}</ul>
        <textarea onChange={this.onChange} value={this.state.page.lines.join("\n")} />
      </div>
    );
  }

  startEdit(editline){
    this.debug(`start edit line:${editline}`);
    this.setState({editline});
  }

  stopEdit(){
    this.debug(`stop edit`);
    this.setState({editline: null});
  }

  updateLine(num, value){
    const lines = clone(store.getState().page.lines);
    lines[num] = value;
    store.dispatch({type: "page:lines", value: lines});
  }

  onChange(e){
    store.dispatch({type: "page:lines", value: e.target.value.split(/[\r\n]/)});
  }

}
