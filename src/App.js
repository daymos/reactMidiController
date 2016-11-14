import React, { Component } from 'react';
import type { matrix, cell } from './types';
import _ from 'ramda';
import './app.css';


function initCell(a):cell{
  return {blinking:false, playing:false, loaded:true } //cell should contain all info regarding a sound sample and its execution
}
function grid(x,y):matrix{
  return new Array(x).fill(0).map(()=> new Array(y).fill(initCell(0)))
}

class App extends Component{

  static defaultProps = {
    cells:grid(2,2)
  }

  reducer(el){
    if(el.loaded === false){
      return el;
    }
    else if(el.loaded === true && el.blinking === false){
      return _.evolve({blinking:()=> true}, el)
    }
    else if (el.playing){
    return _.evolve({playing:()=>false, blinking:()=>true}, el)
  } else {
    console.log('defaut')
    return el
  }

}

clickBox(i, j){
  let gridLens = _.lensPath(['cells']), rowLens = _.lensIndex(i), colLens = _.lensIndex(j);
  this.setState(_.over(_.compose(gridLens, rowLens, colLens), this.reducer ,  this.state)) //this compose lenses to get and set new value using update

}

constructor(props){
  super(props)
  const {cells} = props
  this.state = { cells }

}
render(){
  const {cells} =  this.state
  console.log(this.state)
  return (
    <div>{
      cells.map((row, i)=>{
        return <div className='row' key={`row${i}`} > {row.map((col,j)=>{
          let pos = this.state.cells[i][j]['blinking']
          return <div className={`cell ${(pos)?'blinking':''}`} key={`cell${j}`} onClick={this.clickBox.bind(this, i, j)} >
          <audio id={`r${i}c${j}`} >
          <source src='' type="audio/ogg" ></source>
          </audio>
          </div> })} </div> })
        }</div>
      )
    }
  }
  export default App
