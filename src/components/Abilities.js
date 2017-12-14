import React from 'react';

export class Abilities extends React.Component{

  listAbilities(data){
    const abilityList = data.pokemon_abilities.map(function(ability, index){
      if(ability.ability !== ""){
        return <p><span className="AbilityName">{ability.ability}</span> - <span className="AbilityDesc">{ability.desc}</span></p>
      }
      if(index + 1 === data.pokemon_abilities.length && data.pokemon_hidden_ability !== ""){
        return <p><span className="AbilityName">{data.pokemon_hidden_ability}</span><span className="Hidden">(hidden)</span> - <span className="AbilityDesc">{data.pokemon_hidden_ability_desc}</span></p>
      }
      else{
        return null;
      }
    });
    return abilityList;
  }

  render(){
    return(
      <div id="abilities">
      <div className="DataTitle">Abilities</div>
        {this.listAbilities(this.props.data)}
      </div>
    )
  }
}
