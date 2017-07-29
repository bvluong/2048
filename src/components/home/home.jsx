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
    this.arrowUp = this.arrowUp.bind(this);
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


  arrowUp() {
    let newGrid = this.state.grid.slice(0);
    let swap = true;
    while (swap) {
      swap = false;
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
          if (newGrid[i][j] === 0) {
            newGrid[i][j] = newGrid[i+1][j];
            newGrid[i+1][j] = 0;
          } else if (newGrid[i][j] === newGrid[i+1][j]) {
            newGrid[i][j] = newGrid[i][j]*2;
            newGrid[i+1][j] = 0;
            swap = true;
          }
        }
      }
    }
    this.setState({grid: newGrid});
  }

  handleKey(e) {
    switch (e.key) {
      case 'ArrowUp':
        this.arrowUp();
      case 'ArrowDown':

      case 'ArrowLeft':

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
