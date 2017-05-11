/**
 * Created by Administrator on 2017/5/9.
 */
import React from 'react';
import Imgfigure from './Imgfigure';
import ControllerUnits from './ControllerUnit';
let imageDatas=require('./../imageDatas.json');
import style from '../main.less';

imageDatas=(function genImageURL(imageDataArr){
  for(var i=0;i<imageDataArr.length;i++){
    var singleImageData = imageDataArr[i];
    singleImageData.imgUrl=require('../images/'+singleImageData.fileName);
    imageDataArr[i]=singleImageData;
  }
  return imageDataArr;
})(imageDatas);

// 获取区间内的一个随机值
function getRangeRandom (low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

//获取0-30°之间的一个任意正负值
function get30DegRandom () {
  return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}

export default class GalleryByReactApp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      imgsArrangeArr:[]
    };

    this.Constant={
      centerPos: {
        left: 0,
        right: 0
      },
      hPosRange: {     //水平方向取值范围
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {     //垂直方向的取值范围
        x: [0, 0],
        topY: [0, 0]
      }
    }
  }

  //组件加载以后，为每张图片计算其位置的范围
  componentDidMount() {
    //首先拿到舞台的大小
    // var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
    var stageDOM = this.refs.stage,
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    //拿到imgFigure的大小
    // var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
    var imgFigureDOM = this.refs.imgFigure0.refs.figure,
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollWidth,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    //计算中心图片的位置点
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH- halfImgH
    };

    //计算左侧，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;
    //计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);
  }

  /*
   * 利用rearrange函数，居中对应index图片
   * @param index，需要被居中的图片对应的图片信息数组的index值
   * @return {Function}
   */
  rearrange(centerIndex){
    var imgsArrangeArr = this.state.imgsArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.x,

      imgsArrangeTopArr = [],
      topImgNum = Math.floor(Math.random() * 2),   //不取或者取一个
      topImgSpliceIndex = 0,
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
    //首先居中centerIndex的图片，居中的centerIndex的图片不需要旋转

      imgsArrangeCenterArr[0]={
        pos: centerPos,
        rotate: 0,
        isCenter: true
      }

    //取出要布局上侧的图片的状态信息

    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

    //布局位于上侧的图片

    imgsArrangeTopArr.forEach(function (value, index) {
      imgsArrangeTopArr[index] = {
        pos: {
          top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      };
    });

    //布局左右两侧图片
    for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      var hPosRangeLORX = null;

      //前半部分布局左边，右半部分布局右边
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX;
      }

      imgsArrangeArr[i] = {
        pos: {
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      };
    }

    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeTopArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }

    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    this.setState({
      imgsArrangeArr: imgsArrangeArr
    });

  }

  inverse(index){
    return function () {
      var imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
    }.bind(this)
  }
  center(index){
    return function () {
      this.rearrange(index);
    }.bind(this);
  }

  getInitialState(){
    return{
      imgsArrangeArr:[]
    };
  }

  render(){
    var controllerUnits=[],
      imgFigures=[];

    var self=this;
    imageDatas.forEach(function(value,index){
      if(!self.state.imgsArrangeArr[index]) {
        self.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }

      }

      imgFigures.push(<Imgfigure data={value}  ref={'imgFigure' + index}
        arrange={self.state.imgsArrangeArr[index]} inverse={self.inverse(index)}
        center={self.center(index)}
      />);

      controllerUnits.push(<ControllerUnits
        key={index} arrange={self.state.imgsArrangeArr[index]}
        inverse={self.inverse(index)} center={self.center(index)} />);
    })
    return(
      <div className={style.gallery} ref="stage">
        <section className={style.gallery_stage}>
          <section className={style.img_sec}>
            {imgFigures}
          </section>
          <nav className={style.controller_nav}>
            {ControllerUnits}
          </nav>
        </section>
      </div>
    )
  }
}




