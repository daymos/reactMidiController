import React, { Component } from 'react';
import _ from 'ramda'
import './app.css';

type matrix = Array<Array<cell>>
type cell = {
  visible:0|1
}

function initCell(a):cell{
return {visible:a}
}
function grid(x,y):matrix{
  return new Array(x).fill(0).map(()=> new Array(y).fill(initCell(0))) 
}

class App extends Component{

  static defaultProps = {
    cells:grid(4,15) 
  }
  update(el){
  return (!el.visible)?{visible:1}:{visible:0}
  }

  constructor(props){
    super(props)
    const {cells} = props
    this.state = { cells }

  }
  render(){
    const {cells} =  this.state
    return (
    <div>{
     cells.map((row, i)=>{ 
       return <div className='row' key={`row${i}`} > {row.map((col,j)=>{ 
         let pos = this.state.cells[i][j]['visible']
         return <div className={`cell ${(pos)?'active':''}`} key={`cell${j}`} onClick={ (e)=>{
          let gridLens = _.lensPath(['cells']), rowLens = _.lensIndex(i), colLens = _.lensIndex(j);
          this.setState(_.over(_.compose(gridLens, rowLens, colLens), this.update ,  this.state))
         }} >{''}</div> })} </div> }) 
    }</div>
    )
  }
}
export default App

