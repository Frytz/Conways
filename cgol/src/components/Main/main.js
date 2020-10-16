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
        <div>
          <h3> What is "The Game of Life?"</h3>
          <div>
            <p>The game of life is a cellular automaton ( A collection of "colored" cells on a grid of specified shape that evolves through a number of discrete time steps according to a set of rules based on the states of neighboring cells.)</p>
          </div>
          <div>
          <h4>The rules of "The Game of Life":</h4>
          <p>#1- Any live cell with fewer than two live neighbors dies (underpopulation). </p>
          <p>#2- Any live cell with or three live neighnors live on to the next generation.</p>
          <p>#3- Any live cell with more than thee live neighbors dies (overpopulation).</p>
          <p>#4- Any dead cell with exactly three live neighbors becomes  live cell (reproduction).</p>
          </div>
          <h4>How can Conway's "Game of Life" be useful in real life?</h4>
          <p>It can help visualize how human or animal groups themselves rotate through environments or migrate through them in search of more resources.</p>
        </div>
        <h3>Play the game below</h3>
      </div>
    )
  }
}
// Create the box component(cells)
class Box extends React.Component {
    // create a function that allows cells to be turned oon or off by clicking them
    selectBox = () => {
      this.props.selectBox(this.props.row, this.props.col)
    }
   //create a render function that displays the cells
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


  // Create a grid that maps out the cells in columns and rows 
  class Grid extends React.Component {
    render() {
      //Define the grid
      const width = this.props.cols * 14
      var rowsArr = []
      var boxClass = "";
      //Iterate through the rows
      for (var i = 0; i < this.props.rows; i++) {
        //Iterate through the columns
        for (var j = 0; j < this.props.cols; j++) {
          let boxId = i + "_" + j;
          //Determine if the cells are alive or dead 
          boxClass = this.props.gridFull[i][j] ? "box on" : "box off"

          //Add the cells to aan array
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
      //Display the array in a grid
      return (
        <div className="grid" style={{width: width}}>
          {rowsArr}
        </div>
      );
    }
  }

  //Create functional buttons
  class Buttons extends React.Component{
    //Grid size button function
    handleSelect = (evt) => {
      this.props.gridSize(evt)
    }

      render() {
          return (
            //create and render the buttons
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
   //grid size dropdown buttons
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


//render the  app
class Main extends React.Component {
  //cunstruct the base defaults
    constructor() {
        super();
        this.speed = 100;
        this.rows = 30;
        this.cols = 50;
        //boolean for preventing the box select from triggering while the game is running
        this.playState = false;
        this.seedState = false;
        this.state = {
          generation: 0,
          gridFull: Array(this.rows).fill().map(() => Array(this.col).fill(false))
        }
    }
    // select box helper onclick function
    selectBox = (row, col) => {
      //does not trigger if playstate true
      if (this.playState !== true) {
        let gridCopy = arrayClone(this.state.gridFull);
        gridCopy[row][col] = !gridCopy[row][col]
        this.setState({
          gridFull: gridCopy
        });
      }
      }
      //seed onClick helper function
      seed = () => {
        //does not trigger if playstate true
        if (this.playState !== true) {
        //add the seed to be debuffered
        let gridCopy = arrayClone(this.state.gridFull);
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
            if (Math.floor(Math.random() * 4) === 1) {
              gridCopy[i][j] = true;
            
           }
          }
        }
        //sets the seeded grid state
        this.setState({
          gridFull: gridCopy
        });
        }
    }

      //Button onClick helper functions
      playButton = () => {
        // sets the play state
        this.playState = true;
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed);
        console.log(this.playState);
      }
    
      pauseButton = () => {
        // sets the play state
        this.playState = false;
        clearInterval(this.intervalId);
        console.log(this.playState);
      }
    
      slow = () => {
        this.speed = 1000;
        // this.playButton();
      }  
      fast = () => {
        this.speed = 10;
        // this.playButton();
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
      <footer style ={{
        borderTop: '1px solid black',
        height: '30px',
        width: '100%',
        marginTop: '10px'
      }}>
        
      </footer>
        </BodyDiv>
    );
}
}
//Debuffered array
function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr))
  }


export default Main;