
import React, { Component } from 'react';
import type { matrix, cell } from './types';
import _ from 'ramda';
import './app.css';

//const _audioServer = 'https://soundz-server.herokuapp.com/'
const _audioServer = 'http://localhost:3002'

function initCell(i,j):cell{
  return {row: i, col:j, blinking: false, playing: false, loaded: true, sample: '128_C_MelodyWoody_SP_01.wav' } //cell should contain all info regarding a sound sample and its execution
}
function grid(x,y):matrix{
  return new Array(x).fill(0).map((_, i)=> new Array(y).fill(0).map((_, j)=> initCell(i, j)))
}

class App extends Component{

  static defaultProps = {
    cells:grid(2, 2),
    playing:[]
  }

  reducer(i, j){

  let {cells, playing} = this.state;

  let transformations = {
    playing: ()=> _.flatten(cells).filter((el) => el.playing === true),
    cells:() => {
      let gridLens = _.lensPath(['cells']), rowLens = _.lensIndex(i), colLens = _.lensIndex(j),
      res = cells.slice(0)
      res[i][j] = cellOverwriter(cells[i][j]) 
      return res


    function cellOverwriter(el){
    if( el.blinking === false){
      return _.evolve({blinking:()=> true, playing:()=> true}, el)
    }
    if( el.blinking === true){
      return _.evolve({blinking:()=> false, playing:()=> false}, el)
    }
    if (el.playing){
    return _.evolve({playing:()=>false, blinking:()=>true}, el)
  } else {
    console.log('defaut')
    return el
  }
  }

    }
  }
    return _.evolve(transformations, this.state)
 }

looper(){
  //play all item into play array every given ammount of time passes
}

clickBox(i, j){
  this.setState(this.reducer(i, j),()=>{ console.log('cb: ', this.state) } )
}

constructor(props){
  super(props)
  this.state = { ...props }
}

render(){
  const {cells} =  this.state
  return (
    <div>{
      cells.map((row, i)=>{
        return <div className='row' key={`row${i}`} > {row.map((col,j)=>{
          let blinking = cells[i][j]['blinking']
          let playing = cells[i][j]['playing']
          return <div className={`cell ${(blinking)?'blinking':''}`} key={`cell${j}`} onClick={this.clickBox.bind(this, i, j)}  >
            <audio id={`r${i}c${j}`} loop>
              <source src={`${_audioServer}/${cells[i][j]['sample']}`} type="audio/ogg" ></source>
            </audio>
        </div> })} </div> })
        }</div>
      )
    }
  }
  export default App
