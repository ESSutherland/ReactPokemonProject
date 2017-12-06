import React from 'react';

export class StatGraph extends React.Component{
  componentDidMount(){
    this.updateStats();
  }
  componentDidUpdate(){
    this.updateStats();
  }

  updateStats(){
    var elem = document.getElementById(this.props.stat);
    var width = (this.props.value / this.props.total) * 200;
    elem.style.width = width + "%";
  }

  render(){
    return(
      <div className="StatDiv">
        <label for={this.props.stat + "Bar"}>{this.props.stat}: {this.props.value} </label>
        <div id={this.props.stat + "Bar"} className="StatBackgroud">
          <div id={this.props.stat} className="Stat"></div>
        </div>
      </div>
    )
  }
}
