import Types from '../data/types.json';
import React from 'react';

export class TypeChart extends React.Component{
  listEffectivness(currentState){
    var type1 = currentState.currentData.pokemon_types[0];
    var type2 = currentState.currentData.pokemon_types[1];
    var type1Effective = 1;
    var type2Effective = 1;
    var type1Weakness;
    var type2Weakness;
    for(var i = 0; i < Types.length; i++){
      if(type1.type === Types[i].type){
        type1Weakness = Types[i].weakness;
      }
      if(type2.type === Types[i].type){
        type2Weakness = Types[i].weakness;
      }
    }
    const effectiveList = type1Weakness.map(function(type, index){
      type1Effective = parseFloat(type.effective);
      if(currentState.currentData.pokemon_types[1].type !== ""){
        type2Effective = parseFloat(type2Weakness[index].effective);
      }
      return <tr><td><span class={type.type}>{type.type}</span></td><td>{type1Effective * type2Effective}</td></tr>
    });
    return effectiveList;
  }
  toFract(number){
    //var fract = new Fraction(number);
    //return fract;
  }
  render(){
    return(
       <table id="information">
         <th>Type</th><th>Effectivness</th>
         {this.listEffectivness(this.props.state)}
       </table>
    )
  }
}
