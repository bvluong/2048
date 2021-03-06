import React from 'react';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      grid: [[2,2,0,2],
             [2,0,0,2],
             [2,2,0,0],
             [2,0,0,2]]
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
      let empty = (this.state.grid[rowNum][i] === 0);
      row.push(<div key={i} className={`block ${empty ? "empty" : "filled"}`}>
        {empty ? "" : this.state.grid[rowNum][i]}
      </div>);
    }
    return row;
  }


  addBlock(grid) {
    let newGrid = grid.map(row => row.slice(0));
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        this.combineBlock(newGrid,i,j);
      }
    }
    this.moveBlock(newGrid);

    return newGrid;
  }

  combineBlock(newGrid,row,col) {
    for (var i = 1; i < 4-row; i++) {
      if (newGrid[row][col] === newGrid[row+i][col]) {
        newGrid[row][col] = newGrid[row+i][col]*2;
        newGrid[row+i][col] = 0;
        break;
      }
    }
  }

  moveBlock(newGrid) {
    let swap = true;
    while (swap) {
      swap = false;
      for (var i = 3; i > 0; i--) {
        for (var j = 0; j < 4; j++) {
          if (newGrid[i][j] !== 0 && newGrid[i-1][j] === 0) {
            swap = true;
            const val = newGrid[i][j];
            newGrid[i-1][j] = val;
            newGrid[i][j] = 0;
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
    this.checkGameState();

    if (!this.compare(oldGridState)) {
      this.addRandomNum();
    }
  }

  checkGameState() {
    if (this.winner()) {
      this.displayWinner();
      this.setState({grid:
                  [[0,0,0,0],
                   [2,2,0,0],
                   [0,0,0,0],
                   [0,0,0,0]]});
    }
    if (this.gameOver()) {
      this.setState({grid:
                  [[0,0,0,0],
                   [2,2,0,0],
                   [0,0,0,0],
                   [0,0,0,0]]});
    }
  }

  compare(oldGridState) {
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
    return this.full() && this.checkAllAdj();
  }

  checkAllAdj() {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (this.checkAdjBlock(i,j)) {
          return false;
        }
      }
    }
    return true;
  }

  full() {
    return this.state.grid.every(row => row.every(block => block !== 0));
  }

  checkAdjBlock(row,col) {
    const val = this.state.grid[row][col];
    const posAdj = [[-1,0],[0,-1],[1,0],[0,1]];
    posAdj.some(pos => {
      let newRow = row+pos[0];
      let newCol = col+pos[1];
      if (this.validPos(newRow,newCol)) {
        val == this.state.grid[newRow][newCol];
      } else {
        false;
      }
    });
  }

  validPos(row,col) {
    return row >= 0 && col >= 0 && row < 4 && col < 4;
  }

  winner() {
    return this.state.grid.some(row => row.some(block => block === 2048));
  }

  displayWinner() {

  }

  addRandomNum() {
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
    let val = (Math.random() > 0.9 ? 4 : 2);
    grid[blockIdx[0]][blockIdx[1]] = val;
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
