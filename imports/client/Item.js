import React, { Component } from 'react';
import Items from '../api/items/items';

export default class Item extends Component {


  render() {
    return (
      <div className='item'>
        <div >
          <h3>{this.props.item.name}</h3>
        </div>
      </div>
    )
  }
}
