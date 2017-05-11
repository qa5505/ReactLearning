/**
 * Created by Administrator on 2017/5/9.
 */
import React from 'react';

import  style from '../main.less';

export default class Imgfigure extends React.Component{
  constructor(props){
    super(props);

  }

  handleclick(e){
      e=event||window.event;
      if(this.props.arrange.isCenter){
        this.props.inverse();
      }else{
        this.props.center();
      }
      e.stopPropagation();
      e.preventDefault();
  }
  render(){

    var styleObj={};
    //如果props属性中指定了这张图片的位置，则使用
    if(this.props.arrange.pos){
      styleObj=this.props.arrange.pos;
    }

    if(this.props.arrange.rotate){
      styleObj['transform']='rotate('+this.props.arrange.rotate+'deg)';
    }
    var imgFigureClassName = style.img_figure;


    return (
      <figure className={imgFigureClassName} style={styleObj} ref="figure" onClick={this.handleclick.bind(this)} >
        <img src={this.props.data.imgUrl}
             alt={this.props.data.title}/>
        <figcaption>
          <h2 className={style.img_title}>{this.props.data.title}</h2>
          <div className={style.img_back} onClick={this.handleclick.bind(this)} >{this.props.data.desc}</div>
        </figcaption>
      </figure>
    )
  }
}


