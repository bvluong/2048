import React from 'react';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      block01: 2,
      block02: 0,
      block03: 0,
      block04: 0,
      block11: 0,
      block12: 2,
      block13: 0,
      block14: 0,
      block21: 2,
      block22: 4,
      block23: 0,
      block24: 0,
      block31: 0,
      block32: 0,
      block33: 0,
      block34: 0
    };
    this.createRow.bind(this);
  }

  createRow(rowNum) {
    const row = [];
    for (var i = 1; i < 5; i++) {
      let blockID = `block${rowNum}${i.toString()}`;

      row.push(<div className="block ${rowNum}${i.toString()}">
        {this.state[blockID] === 0 ? "" : this.state[blockID]}
      </div>);
    }

    return row;
  }

  render () {
    return (
    <div className='home'>
      <div className="row row-0">
        {this.createRow("0")}
      </div>
      <div className="row row-1">
        {this.createRow("1")}
      </div>
      <div className="row row-2">
        {this.createRow("2")}
      </div>
      <div className="row row-3">
        {this.createRow("3")}
      </div>
    </div>
    );
  }
}

export default Home;
