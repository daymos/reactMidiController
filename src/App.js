import React, { Component } from 'react';
import _ from 'ramda'
import './app.css';

function grid(x,y){
  'use strict'
  return new Array(x).fill(0).map(()=> new Array(y).fill({visible:0})) 
}

class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      cells: grid(4,15) 
    }
  }
  render(){
    const {cells} =  this.state
    console.log(this.state)
    return (
    <div>{
     cells.map((row, i)=>{ 
       return <div className='row' key={`row${i}`} > {row.map((col,j)=>{ 
         let pos = this.state.cells[i][j]['visible']
         return <div className={`cell ${(pos)?'active':''}`} key={`cell${j}`} onClick={ (e)=>{
          let gridLens = _.lensPath(['cells']), rowLens = _.lensIndex(i), colLens = _.lensIndex(j);
        this.setState(_.over(_.compose(gridLens, rowLens, colLens), (el)=>{return (!el.visible)?{visible:1}:{visible:0} },  this.state))
         }} >{j}</div> })} </div> }) 
    }</div>
    )
  }
}
export default App

