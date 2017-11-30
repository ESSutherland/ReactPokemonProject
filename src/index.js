import React from 'react';
import ReactDOM from 'react-dom';
import Types from './data/types.json';
import {generation1Data} from './data/exportData.js';
import {TypeChart} from './components/TypeChart.js';
import "./styles/index.css";

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
        //var pokemon = Gen1Data[val - 1];
      //  var pokemonInfo = Gen1Info[val - 1];
      var pokemon = generation1Data[val - 1].pokemon;
      this.setState({pokemon: pokemon});
      }
      this.changeData(pokemon.pokemon_image, pokemon);
    }
    else{
      this.setState({showData: false})
    }
  }
  fillPokemonSelect(generation){

    const pokemonList = generation.map(function(pokemon){
      var id = parseInt(pokemon.pokemon.pokemon_id);
      return <option value={id}>{pokemon.pokemon.pokemon_name}</option>
    });
    return pokemonList;
  }

  changeData(image, data){
    this.setState({currentData: data, currentImage: image, showData: true});
  }

  handleFormChange(e){
    var val = e.target.value;
    if(val === "normal"){
      this.changeData(this.state.pokemon.pokemon_image, this.state.pokemon);
    }
    if(val === "shiny"){
      this.changeData(this.state.pokemon.pokemon_shiny, this.state.pokemon);
    }
    if(val === "female1"){
      this.changeData(this.state.pokemon.pokemon_female[0].image, this.state.pokemon);
    }
    if(val === "female2"){
      this.changeData(this.state.pokemon.pokemon_female[1].image, this.state.pokemon);
    }
    if(val === "mega1"){
      this.changeData(this.state.pokemon.pokemon_megas[0].pokemon_image, this.state.pokemon.pokemon_megas[0]);
    }
    if(val === "mega2"){
      this.changeData(this.state.pokemon.pokemon_megas[0].pokemon_shiny, this.state.pokemon.pokemon_megas[0]);
    }
    if(val === "mega3"){
      this.changeData(this.state.pokemon.pokemon_megas[1].pokemon_image, this.state.pokemon.pokemon_megas[1]);
    }
    if(val === "mega4"){
      this.changeData(this.state.pokemon.pokemon_megas[1].pokemon_shiny, this.state.pokemon.pokemon_megas[1]);
    }
    if(val === "alolan1"){
      this.changeData(this.state.pokemon.pokemon_alolan[0].pokemon_image, this.state.pokemon.pokemon_alolan[0]);
    }
    if(val === "alolan2"){
      this.changeData(this.state.pokemon.pokemon_alolan[0].pokemon_shiny, this.state.pokemon.pokemon_alolan[0]);
    }
  }
  createFormSelect(pokemon){
      var normal = (<option value="normal">Normal</option>);
      var shiny = (<option value="shiny">Shiny</option>);

      const femaleList = pokemon.pokemon_female.map(function(female, index){
        if(female.image != ""){
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
      if(type.type != ""){
        return <span class={type.type}>{type.type}</span>
      }
      else{
        return null;
      }
    });
    return typeList;
  }
  listAbilities(data){
    const abilityList = data.pokemon_abilities.map(function(ability, index){
      if(ability.ability !== ""){
        return <p><span class="AbilityName">{ability.ability}</span> - <span class="AbilityDesc">{ability.desc}</span></p>
      }
      if(index + 1 === data.pokemon_abilities.length && data.pokemon_hidden_ability !== ""){
        return <p><span class="AbilityName">{data.pokemon_hidden_ability}</span><span class="Hidden">(hidden)</span> - <span class="AbilityDesc">{data.pokemon_hidden_ability_desc}</span></p>
      }
      else{
        return null;
      }
    });
    return abilityList;
  }

  render(){
    return(
      <div class="Main">
      <div class="Header">
      POKEMON DATABASE
      <div class="BigCircle">
        <div class="SmallCircle"></div>
      </div>
      </div>
        <div class="Selection">
        <select id="generation1" onChange={this.handlePokemonChange.bind(this)}>
          <option value="0">-Generation 1-</option>
          {this.fillPokemonSelect(generation1Data)}
        </select>
        </div>
        { this.state.showData ?
        <div id="data">
          <div id="pokemonInfo">
            <span id="pokemonId">
              Pokedex No: {this.state.pokemon.pokemon_id}
            </span>
            {this.state.pokemon.pokemon_name}
          </div>
          <div class="PokemonImage">
            <img src={require(`${this.state.currentImage}`)}/>
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
          <div id="abilities">
          <div class="DataTitle">Abilities:</div>
            {this.listAbilities(this.state.currentData)}
          </div>
        </div>
         : null }
         {this.state.showData ?
          <TypeChart state={this.state}/>
         : null}
      </div>
    );
  }
}
ReactDOM.render(<Pokemon/>, document.getElementById('root'))
