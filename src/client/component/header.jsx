import React, {Component} from "react";

import Login from "./login";
import Title from "./title";

export default class Header extends Component{

  static get propTypes(){
    return {
      store: React.PropTypes.object.isRequired
    };
  }

  render(){
    const {store} = this.props;
    return(
      <div className="header">
        <Login />
        <Title store={store} />
      </div>
    );
  }

}
