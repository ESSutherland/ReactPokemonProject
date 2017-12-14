import React from 'react';
import ReactDOM from 'react-dom';
import Types from './data/types.json';
import {generation1Data} from './data/exportData.js';
import {generation1Images} from './images/exportImages.js';
import {TypeChart} from './components/TypeChart.js';
import {StatGraph} from './components/StatGraph.js';
import {Abilities} from './components/Abilities.js';
import {EvolutionLine} from './components/EvolutionLine.js';
require("./styles/index.css")

class Pokemon extends React.Component{
  constructor(){
    super();
    this.state = {
      pokemon:{

    },
    currentData: {

    },
    showData: false,
    currentImage: "",
    totalStats: 0
  }
}

  handlePokemonChange(e){
    var val = parseInt(e.target.value);
    var id = e.target.id;
    if(document.getElementById("forms")){
      document.getElementById("forms").value = "normal";
    }
    if(val > 0){
      if(id === "generation1"){
      var pokemon = generation1Data[val - 1].pokemon;
      var image = generation1Images[val - 1].normal;
      this.setState({pokemon: pokemon});
      }
      this.changeData(image, pokemon);
    }
    else{
      this.setState({showData: false})
    }
  }
  fillPokemonSelect(generation){

    const pokemonList = generation.map(function(pokemon){
      var id = parseInt(pokemon.pokemon.pokemon_id);
      return <option value={id}>{pokemon.pokemon.pokemon_id} - {pokemon.pokemon.pokemon_name}</option>
    });
    return pokemonList;
  }

  changeData(image, data){
    var totalStats = 0;
    for(var i  = 0; i < data.pokemon_stats.length; i++){
        totalStats += parseInt(data.pokemon_stats[i].value);
    }
    this.setState({currentData: data, currentImage: image, showData: true, totalStats: totalStats});
  }

  handleFormChange(e){
    var val = e.target.value;
    var id = parseInt(this.state.pokemon.pokemon_id);
    if(val === "normal"){
      this.changeData(generation1Images[id - 1].normal, this.state.pokemon);
    }
    if(val === "shiny"){
      this.changeData(generation1Images[id - 1].shiny, this.state.pokemon);
    }
    if(val === "female1"){
      this.changeData(generation1Images[id - 1].female, this.state.pokemon);
    }
    if(val === "female2"){
      this.changeData(generation1Images[id - 1].female_shiny, this.state.pokemon);
    }
    if(val === "mega1"){
      this.changeData(generation1Images[id - 1].mega1, this.state.pokemon.pokemon_megas[0]);
    }
    if(val === "mega2"){
      this.changeData(generation1Images[id - 1].mega1_shiny, this.state.pokemon.pokemon_megas[0]);
    }
    if(val === "mega3"){
      this.changeData(generation1Images[id - 1].mega2, this.state.pokemon.pokemon_megas[1]);
    }
    if(val === "mega4"){
      this.changeData(generation1Images[id - 1].mega2_shiny, this.state.pokemon.pokemon_megas[1]);
    }
    if(val === "alolan1"){
      this.changeData(generation1Images[id - 1].alolan, this.state.pokemon.pokemon_alolan[0]);
    }
    if(val === "alolan2"){
      this.changeData(generation1Images[id - 1].alolan_shiny, this.state.pokemon.pokemon_alolan[0]);
    }
  }
  createFormSelect(pokemon){
      var normal = (<option value="normal">Normal</option>);
      var shiny = (<option value="shiny">Shiny</option>);

      const femaleList = pokemon.pokemon_female.map(function(female, index){
        if(female.image !== ""){
          var val = "female" + (index + 1);
          return <option value={val}>{female.name}</option>
        }
        else{
          return null;
        }
      });

      const megaList = pokemon.pokemon_megas.map(function(mega, index){
        var number = index + 1;
        const nameList = mega.pokemon_name.map(function(name, nameindex){
          var val = "mega" + (index + nameindex + number);
          if(name.pokemon_name !== ""){
            return <option value={val}>{name.pokemon_name}</option>
          }
          else {
            return null;
          }
        });
        return nameList;
      });

      const alolaList = pokemon.pokemon_megas.map(function(alolan, index){
        var number = index + 1;
        const nameList = alolan.pokemon_name.map(function(name, nameindex){
          var val = "mega" + (index + nameindex + number);
          if(name.pokemon_name !== ""){
            return <option value={val}>{name.pokemon_name}</option>
          }
          else {
            return null;
          }
        });
        return alolaList;
      });

      return(
        <select id="forms" onChange={this.handleFormChange.bind(this)}>
        {normal}
        {shiny}
        {femaleList}
        {megaList}
        {alolaList}
        </select>
      );
  }
  listTyping(types){
    const typeList = types.map(function(type){
      if(type.type !== ""){
        return <span className={type.type}>{type.type}</span>
      }
      else{
        return null;
      }
    });
    return typeList;
  }
  render(){
    return(
      <div className="Main">
        <div className="Selection">
          <select id="generation1" onChange={this.handlePokemonChange.bind(this)}>
            <option value="0">-Generation 1-</option>
            {this.fillPokemonSelect(generation1Data)}
          </select>
        </div>
        { this.state.showData ?
        <div id="data">
          <div id="left">
            <div id="pokemonData">
              <div id="pokemonName">
                <span id="pokemonId">
                  Pokedex No: {this.state.pokemon.pokemon_id}
                </span>
                {this.state.pokemon.pokemon_name}
              </div>
              <div className="PokemonImage">
                <img src={this.state.currentImage}/>
              </div>
              <div id="typing">
                <p>
                  {this.listTyping(this.state.currentData.pokemon_types)}
                </p>
              </div>
              <div id="formSelect">
                Forms:
                {this.createFormSelect(this.state.pokemon)}
              </div>
              <table id="pokemonInfo">
                <tr><td>Species: </td><td>{this.state.currentData.pokemon_species}</td></tr>
                <tr><td>Height: </td><td>{this.state.currentData.pokemon_height}</td></tr>
                <tr><td>Weight: </td><td>{this.state.currentData.pokemon_weight}</td></tr>
              </table>
            </div>
            <Abilities data={this.state.currentData}/>
          </div>
          <div id="right">
            <TypeChart state={this.state}/>
          </div>
          <div id="middle">
            <div id="pokedex">
              <div className="DataTitle">PokeDex Entry</div>
              <div id="entry">{this.state.pokemon.pokemon_pokedex}</div>
            </div>
            <div id="stats">
              <div className="DataTitle">Base Stats</div>
              <StatGraph stat={this.state.currentData.pokemon_stats[0].stat} value={this.state.currentData.pokemon_stats[0].value} total={this.state.totalStats}/>
              <StatGraph stat={this.state.currentData.pokemon_stats[1].stat} value={this.state.currentData.pokemon_stats[1].value} total={this.state.totalStats}/>
              <StatGraph stat={this.state.currentData.pokemon_stats[2].stat} value={this.state.currentData.pokemon_stats[2].value} total={this.state.totalStats}/>
              <StatGraph stat={this.state.currentData.pokemon_stats[3].stat} value={this.state.currentData.pokemon_stats[3].value} total={this.state.totalStats}/>
              <StatGraph stat={this.state.currentData.pokemon_stats[4].stat} value={this.state.currentData.pokemon_stats[4].value} total={this.state.totalStats}/>
              <StatGraph stat={this.state.currentData.pokemon_stats[5].stat} value={this.state.currentData.pokemon_stats[5].value} total={this.state.totalStats}/>
              <p className="StatDiv">Total: {this.state.totalStats}</p>
            </div>
            <EvolutionLine data={this.state.pokemon}/>
          </div>
          <div id="spacer"></div>
        </div>
         :
        <div id="home">
          Choose a pokemon from the drop-downs above to view information about that pokemon.
        </div>}
      </div>
    );
  }
}
ReactDOM.render(<Pokemon/>, document.getElementById('root'))
