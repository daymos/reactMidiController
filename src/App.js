
import React, { Component } from 'react';
import type { matrix, cell } from './types';
import _ from 'ramda';
import './app.css';

//const _audioServer = 'https://soundz-server.herokuapp.com/'
const _audioServer = 'http://localhost:3002'

function initCell(i,j):cell{
  return {row: i, col:j, queing: false, playing: false, loaded: true, sample: '128_C_MelodyWoody_SP_01.wav' } //cell should contain all info regarding a sound sample and its execution
}
function grid(x,y):matrix{
  return new Array(x).fill(0).map((_, i) => new Array(y).fill(0).map((_, j) => initCell(i, j)))
}

class App extends Component{

  static defaultProps = {
    cells: grid(2, 2),
    playing: [],
    queing: [],
    ctx:  new AudioContext(),
    start: 0
  }

  reducer(i, j){

  let {cells, playing, start, ctx} = this.state;

  let transformations = {
    queing: () => _.flatten(cells).filter((el) => el.queing === true),
    playing: () => _.flatten(cells).filter((el) => el.playing === true),
    cells:() => {
    let gridLens = _.lensPath(['cells']), rowLens = _.lensIndex(i), colLens = _.lensIndex(j),
      res = cells.slice(0)
      res[i][j] = cellOverwriter(cells[i][j]) 
      return res


    function cellOverwriter(el){
    if( el.queing === false){
      return _.evolve({queing:() => true}, el)
    }
    if( el.queing  && !el.playing){
      return _.evolve({queing:() => false}, el)
    }
    if (el.playing){
      return _.evolve({playing:() => false, queing:() => true}, el)
    } else {
    console.log('defaut')
    return el
    }
  }

    },
    start:() => (start === 0)? ctx.currentTime: start 
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
  this.looper()
  console.log(this.state.ctx)
  return (
    <div>{
      cells.map((row, i)=>{
        return <div className='row' key={`row${i}`} > {row.map((col,j)=>{
          let queing = cells[i][j]['queing']
          let playing = cells[i][j]['playing']
          return <div className={`cell ${(playing)?'playing':(queing)?'queing':''}`} key={`cell${j}`} onClick={this.clickBox.bind(this, i, j)}  >
                    <audio id={`r${i}c${j}`} >
                      <source src={`${_audioServer}/${cells[i][j]['sample']}`} type="audio/ogg" ></source>
                    </audio>
                  </div> })}
              </div> })
    }</div>
      )
    }
  }
  export default App
