import React from 'react'
import styled from "styled-components";
import { Dropdown, DropdownButton, ButtonToolbar } from 'react-bootstrap';
// import Button from '@material-ui/core/Button';


import '../../index.css';

const BodyDiv = styled.div`
display: flex;
${'' /* flex-direction: collumn; */}
${'' /* justify-content: center; */}

${'' /* border: 1px solid black; */}
height: 99vh;
margin: 5px 20px 0 20px;
`
const HeaderDiv = styled.div`
display: flex;
justify-content: center;

padding:10px;
${'' /* background-color: red; */}
${'' /* border: 1px solid blue; */}
// margin-left: 10px;
// margin-right: 10px;
`
const Title = styled.div`
${'' /* justify-content: collumn; */}
${'' /* border: 1px solid red; */}
`
const ButtonDiv = styled.div`
${'' /* height: 10vh; */}
display: flex;
${'' /* border: 1px solid green; */}
width:50%
`
class Info extends React.Component{
  render () {
    return (
      <div>
        <div>
        <h2>Who is John Conway?</h2>
        </div>
        <div>
         <h3>John Horton Conway</h3>
         <p>12/26/1937 - 04/11/2020</p> 
        </div>
        <div>
          <p> John Conway was an English mathematician.</p>
          <p> He was was active in a multitude of diferrent theories, such as, finite groups, knot theory, number theory, combinatorial game theory and coding theory.</p>
          <p> However, he was mostly known for his invention of the cellular automaton known as "The Game of Life"</p>
        </div>
      </div>
    )
  }
}

class Box extends React.Component {
    selectBox = () => {
      this.props.selectBox(this.props.row, this.props.col)
    }
  
    render () {
      return (
        <div 
          className={this.props.boxClass}
          id={this.props.id}
          onClick={this.selectBox}
        />
      )
    }
  }



  class Grid extends React.Component {
    render() {
      const width = this.props.cols * 14
      var rowsArr = []
      var boxClass = "";
      for (var i = 0; i < this.props.rows; i++) {
  
        for (var j = 0; j < this.props.cols; j++) {
          let boxId = i + "_" + j;
  
          boxClass = this.props.gridFull[i][j] ? "box on" : "box off"
          rowsArr.push(
            <Box 
              boxClass={boxClass}
              key={boxId}
              boxId={boxId}
              row={i}
              col={j}
              selectBox={this.props.selectBox}
            />
          );
        }
      }
      return (
        <div className="grid" style={{width: width}}>
          {rowsArr}
        </div>
      );
    }
  }


  class Buttons extends React.Component{
    handleSelect = (evt) => {
      this.props.gridSize(evt)
    }

      render() {
          return (
          <>
				<ButtonToolbar style={{
          display: 'flex',
          width: "100%",
          justifyContent: "space-evenly",
          // border: '1px red solid',
        }}
        >
					<button className="btn btn-primary" onClick={this.props.playButton}>
						Play
					</button>
					<button className="btn btn-primary" onClick={this.props.pauseButton}>
					  Pause
					</button>
					<button className="btn btn-primary" onClick={this.props.clear}>
					  Clear
					</button>
					<button className="btn btn-primary" onClick={this.props.slow}>
					  Slow
					</button>
					<button className="btn btn-primary" onClick={this.props.fast}>
					  Fast
					</button>
					<button className="btn btn-primary" onClick={this.props.seed}>
					  Seed
					</button>
  <DropdownButton 
  title="Grid Size"
  id="size-menu"
  onSelect={this.handleSelect}
  >
  <div 
  style={{
    // border: '1px red solid',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }}
  >
  <Dropdown.Item eventKey='1' style={{
    margin: '2px'
  }}
  ><button className="btn btn-primary">20X10</button ></Dropdown.Item>
  <Dropdown.Item eventKey='2'
  style={{
    margin: '2px'
  }}
  ><button className="btn btn-primary">50x30</button></Dropdown.Item>
  <Dropdown.Item eventKey='3'
  style={{
    margin: '2px'
  }}
  ><button className="btn btn-primary">70x50</button></Dropdown.Item>
  </div>
  </DropdownButton>
  </ButtonToolbar>
  
</>
        )
      }
  }



class Main extends React.Component {
    constructor() {
        super();
        this.speed = 100;
        this.rows = 30;
        this.cols = 50;
    
        this.state = {
          generation: 0,
          gridFull: Array(this.rows).fill().map(() => Array(this.col).fill(false))
        }
    }
    selectBox = (row, col) => {
        let gridCopy = arrayClone(this.state.gridFull);
        gridCopy[row][col] = !gridCopy[row][col]
        this.setState({
          gridFull: gridCopy
        });
      }
      seed = () => {
        let gridCopy = arrayClone(this.state.gridFull);
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
            if (Math.floor(Math.random() * 4) === 1) {
              gridCopy[i][j] = true;
            }
          }
        }
        this.setState({
          gridFull: gridCopy
        });
      }


      playButton = () => {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed);
      }
    
      pauseButton = () => {
        clearInterval(this.intervalId);
      }
    
      slow = () => {
        this.speed = 1000;
        this.playButton();
      }  
      fast = () => {
        this.speed = 50;
        this.playButton();
      }
      clear = () => {
        var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
        this.setState({
          gridFull: grid,
          generation: 0
        });
      }

      gridSize = (size) => {
        switch (size) {
          case "1":
            this.cols = 20;
            this.rows = 10;
          break;
          case "2":
            this.cols = 50;
            this.rows = 30;
          break;
          case "3":
            this.cols = 70;
            this.rows = 50;
          break;
          default:
            this.cols = 70;
            this.rows = 50;
        }
        this.clear();
      }
    
        play = () => {
          let g = this.state.gridFull;
          let g2 = arrayClone(this.state.gridFull);
      
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
              let count = 0;
              if (i > 0) if (g[i - 1][j]) count++;
              if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
              if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
              if (j < this.cols - 1) if (g[i][j + 1]) count++;
              if (j > 0) if (g[i][j - 1]) count++;
              if (i < this.rows - 1) if (g[i + 1][j]) count++;
              if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
              if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
              if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
              if (!g[i][j] && count === 3) g2[i][j] = true;
            }
          }
          this.setState({
            gridFull: g2,
            generation: this.state.generation + 1
          });
      
      }
    
      // componentDidMount() {
      //   this.seed();
      //   // this.playButton();
      // }

render () {
    return (
        <BodyDiv style={{
            flexDirection: 'column',
            alignItems: "center"

        }}>
        <HeaderDiv>
        <Title>
            <h1>
                Conway's Game Of Life
            </h1>
            <p>By: John Rossi</p>
        </Title>
        </HeaderDiv>
        <Info/>
        <ButtonDiv
        style={{
            flexDirection: "row",
            justifyContent: "space-around"
        }}
        >
            <Buttons 
            playButton= {this.playButton}
            pauseButton={this.pauseButton}
            slow={this.slow}
            fast={this.fast}
            clear={this.clear}
            seed={this.seed}
            gridSize={this.gridSize}
            />
        </ButtonDiv>
        <h2> Generations: {this.state.generation}</h2>
        <Grid
        gridFull={this.state.gridFull}
        rows={this.rows}
        cols={this.cols}
        selectBox={this.selectBox}

        />
 
        </BodyDiv>
    );
}
}
function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr))
  }


export default Main;