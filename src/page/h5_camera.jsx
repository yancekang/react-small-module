import React, { Component } from 'react';
// import { Link } from 'react-router-dom'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      img_src: 'adf'
    }
  }

  componentDidMount () {

  }

  inputOnchange () {
    let file = this.refs.img_upload.files[0];
    // 选择的文件是图片
    let reader = new FileReader()
    let img = new Image();
    if (file.type.indexOf("image") === 0) {
        reader.readAsDataURL(file);
    }
    reader.onload = (event) => {
      this.setState({img_src: event.target.result})
      var originWidth = 600;
      var originHeight = 600;
      // 最大尺寸限制
      var maxWidth = 400, maxHeight = 400;
      // 目标尺寸
      var targetWidth = originWidth, targetHeight = originHeight;
      // 图片尺寸超过400x400的限制
      if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
              // 更宽，按照宽度限定尺寸
              targetWidth = maxWidth;
              targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
              targetHeight = maxHeight;
              targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
      }
      var canvas = this.refs.myCanvas;
      var context = canvas.getContext('2d');
      // canvas对图片进行缩放
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      // 清除画布
      context.clearRect(0, 0, targetWidth, targetHeight);
      // 图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      // canvas转为blob并上传
      canvas.toBlob((blob) => {
        // console.log(reader.readAsDataURL(blob));
      }, file.type || 'image/png');
    }
  }

  assff (file) {
    let reader = new FileReader()
    if (file.type.indexOf("image") === 0) {
        reader.readAsDataURL(file);
    }
    reader.onload = (event) => {
      this.setState({img_src: event.target.result})
      console.log(event);
    }
  }

  render() {
    let {img_src} = this.state
    return (
      <div className="outer">
        <div className="link_list">
          {/* capture="camera" */}
          <input type="file" accept="image/*"  ref="img_upload" capture="camera" onChange={() => this.inputOnchange()} />
          <img src={img_src} alt="123" width="200" height="100"/>
          {/* {img_src} */}
          <canvas ref="myCanvas" width="200" height="100"></canvas>
        </div>
      </div>
    );
  }
}

export default App;
