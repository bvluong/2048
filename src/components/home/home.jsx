import React from 'react';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      grid: [[2,0,0,0],
             [2,2,0,0],
             [4,8,0,0],
             [0,0,0,0]]
    };
    this.createRow = this.createRow.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.addBlock = this.addBlock.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKey);
  }

  createRow(rowNum) {
    const row = [];
    for (var i = 0; i < 4; i++) {
      row.push(<div key={i} className="block">
        {this.state.grid[rowNum][i] === 0 ? "" : this.state.grid[rowNum][i]}
      </div>);
    }
    return row;
  }


  addBlock(grid) {
    let newGrid = grid.slice(0);
    for (var a = 0; a < 4; a++) {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
          if (newGrid[i][j] === newGrid[i+1][j] && newGrid[i][j] !== 0) {
            newGrid[i][j] = newGrid[i][j]*2;
            newGrid[i+1][j] = 0;
          }
          if (newGrid[i][j] === 0 && newGrid[i+1][j] !== 0) {
            const val = newGrid[i+1][j];
            newGrid[i][j] = val;
            newGrid[i+1][j] = 0;
          }
        }
      }
    }
    return newGrid;
  }

  tranposeGrid() {
    let grid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        grid[i][j] = this.state.grid[j][i];
      }
    }
    return grid;
  }

  untranposeGrid() {
    
  }

  handleKey(e) {
    switch (e.key) {
      case 'ArrowUp':
        let upGrid = this.addBlock(this.state.grid.slice(0));
        this.setState( {grid: upGrid} );
        break;
      case 'ArrowDown':
        let downGrid = this.addBlock(this.state.grid.slice(0).reverse());
        downGrid.reverse();
        this.setState( {grid: downGrid} );
        break;
      case 'ArrowLeft':
        let leftGrid = this.addBlock(this.tranposeGrid());
      case 'ArrowRight':

      default:

    }
  }

  render () {
    return (
    <div className='home'>
      <div className="row row-0">
        {this.createRow(0)}
      </div>
      <div className="row row-1">
        {this.createRow(1)}
      </div>
      <div className="row row-2">
        {this.createRow(2)}
      </div>
      <div className="row row-3">
        {this.createRow(3)}
      </div>
    </div>
    );
  }
}

export default Home;
