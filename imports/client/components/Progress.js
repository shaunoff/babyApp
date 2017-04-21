import React from 'react';

class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.calculateFill = this.calculateFill.bind(this);
  }

  calculateFill() {
    const { bottom, top } = this.props;
    return `${(bottom / top) * 100}%`;
  }

  render() {
    const styles = {
      display: 'block',
      background: '#eee',
      height: '20px',
      width: '100%',
      borderRadius: '30px',
      boxShadow: 'none',
      overflow: 'hidden',
    }
    return (
      <div className="Progress">
      <div id="hello" style={styles}>
        <div style={{ height: '20px', borderRadius: '3px',background: 'green', transition: 'all .7s ease-in-out', width: this.calculateFill() }}></div>
      </div>
    </div>);
  }
}

Progress.propTypes = {
  bottom: React.PropTypes.number,
  top: React.PropTypes.number,
};

export default Progress;
