import React from 'react';
import {generation1Images} from '../images/exportImages.js';

export class EvolutionLine extends React.Component{

    listEvolutions(){
      const evolutionList = this.props.data.pokemon_evolution.map(function(evo){
        if(evo.method !== ""){
          return <span className="EvoImage"><img src={generation1Images[parseInt(evo.pokemon) - 1].normal}/><span className="EvoMethod"> <table><tr>---></tr><tr>{evo.method}</tr></table> </span></span>
        }
        else{
          return <span className="EvoImage"><img src={generation1Images[parseInt(evo.pokemon) - 1].normal}/></span>
        }
      });
      return evolutionList;
    }


    render(){
      return(
        <div id="evolution">
        <div className="DataTitle">Evolution Line</div>
          {this.listEvolutions()}
        </div>
      )
    }
}
