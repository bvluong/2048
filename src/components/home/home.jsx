import React from 'react';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      grid: [[0,0,0,0],
             [2,2,0,0],
             [0,0,0,0],
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
    let newGrid = grid.map(row => row.slice(0));
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

  leftGrid(oldGrid, tranposeBool) {
    let grid = [[],[],[],[]];
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (tranposeBool) {
          grid[i][j] = oldGrid[j][i];
        } else {
          grid[j][i] = oldGrid[i][j];
        }
      }
    }
    return grid;
  }

  rightGrid(oldGrid, tranposeBool) {
    let grid = [[],[],[],[]];
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (tranposeBool) {
          grid[i][j] = oldGrid[3-j][3-i];
        } else {
          grid[3-j][3-i] = oldGrid[i][j];
        }
      }
    }
    return grid;
  }

  handleKey(e) {
    let oldGridState = this.state.grid.slice(0);
    let newGrid = this.state.grid.slice(0);
    switch (e.key) {
      case 'ArrowUp':
        let upGrid = this.addBlock(newGrid);
        this.setState( {grid: upGrid} );
        break;
      case 'ArrowDown':
        let downGrid = this.addBlock(newGrid.reverse());
        downGrid.reverse();
        this.setState( {grid: downGrid} );
        break;
      case 'ArrowLeft':
        let leftGrid = this.addBlock(this.leftGrid(newGrid,true));
        leftGrid = this.leftGrid(leftGrid,false);
        this.setState( {grid: leftGrid } );
        break;
      case 'ArrowRight':
        let rightGrid = this.addBlock(this.rightGrid(newGrid,true));
        rightGrid = this.rightGrid(rightGrid,false);
        this.setState( {grid: rightGrid } );
        break;
      default:
        return;
    }
    if (this.gameOver()) {
      this.setState({grid:
                  [[0,0,0,0],
                   [2,2,0,0],
                   [0,0,0,0],
                   [0,0,0,0]]});
    } else if (!this.compare(oldGridState)) {
      this.placeNum();
    }
  }

  compare(oldGridState) {
    console.log(oldGridState);
    console.log(this.state.grid);
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (oldGridState[i][j] !== this.state.grid[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  gameOver() {
    return this.state.grid.every(row => row.every(block => block !== 0));
  }

  placeNum() {
    const possibleMoves = [];
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (this.state.grid[i][j] === 0) {
          possibleMoves.push([i,j]);
        }
      }
    }
    let grid = this.state.grid.slice(0);
    let blockIdx = possibleMoves[Math.floor(Math.random()*possibleMoves.length)];
    grid[blockIdx[0]][blockIdx[1]] = 2;
    this.setState({grid});

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
