import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Items from '../../api/items/items';
import Loading from './Loading';
import {TweenMax} from "gsap";

class Item extends Component {
  constructor(){
    super()
    this.state={
      loaded: false,

    }
  }
  onImageLoad(){
    this.setState({loaded: true})
    console.log("loaded")
    const el = this.picture;
    const ph = this.placeholder;
    let tl = new TimelineMax();
    tl
    .fromTo(el, 1, {opacity: 0,scale: 1},{opacity: 1,scale: 1},0.5)
    .fromTo(ph, 1, {opacity: 1},{opacity: 0},0.5)
  }

  componentDidMount(){
    var img = new window.Image();
    img.onload = this.onImageLoad.bind(this)
    img.src = this.props.item.url

  }
  render(){
    return (
      <div  style={{margin: '10px',flex: '1', position: 'relative',border: '1px #ccc solid',borderRadius: '6px'}} className="Files">
        <div  style={{display: 'flex',height: "30px",padding: "10px",borderBottom: "1px #ccc solid"}}>
          <div style={{width:'30px', height: '30px', borderRadius: "30px",background: "#007681"}}></div>
          <div style={{marginLeft: '20px',marginTop: '5px',height: '30px', verticalAlign: 'middle'}}>gdgdfgdg</div>
          <div style={{flex: '1'}}></div>
          <div style={{marginRight: '10px',marginTop: '5px',height: '30px', verticalAlign: 'middle'}}>6h</div>
        </div>
        <div  style={{width: '100%'}}>
          <div ref={(ref) => {this.placeholder = ref}} style={{width: '100%',position: 'absolute',top: '50px', height: "600px",background: '#f8f8f8'}}></div>
          <img style={{minHeight: '600px',width: '100%'}} ref={(ref) => {this.picture = ref}}  src={this.props.item.url}/>
        </div>
        <div  style={{width: '100%',height: "50px",background: '#f8f8f8'}}>hgfhfghfgh</div>
      </div>
    )
  }
}


export default Item
