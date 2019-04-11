import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import './acrylics.css';


const images = [
  'images/0048.jpg',
  'images/0049.jpg',
  'images/0050.jpg',
  'images/0051.jpg',
  'images/0052.jpg',
  'images/0053.jpg',
  'images/0054.jpg'
];
const titles = [
  'Canvas #48',
  'Canvas #50',
  'Canvas #51',
  'Canvas #52',
  'Canvas #53',
  'Canvas #54'
];

const captions = [
  'Canvas #48 - 20 x 20 in / "Horizon Line Series" / March 8, 2019 / Status ~ Sold / $0 / Chicago',
  'Canvas #49 - 3 x 4 ft / "Technique Series" / March 2019 / This work explores Masking Tape / Status ~ For Sale / ' +
  'Price ~ best offer',
  'Canvas #50 - 2.5 x 2.5 ft / "Mixed Media Series" / March 2019 / This canvas combines digital photograph with acrylic ' +
  'paint. The base layer is a digital photo enlarged and printed on canvas. Acrylic was then used to create texture and ' +
  'highlights / Status ~ Sold',
  'Canvas #51 - 11 x 14 in / "Technique Series" / April 2019 / This painting explores the scrapping technique / Status ~' +
  ' For Sale / Price ~ 50$',
  'Canvas #52 - 3 x 4 ft / "Projector Series" / (ETA) May 2019 / Design for a painting I am currently working on which ' +
  'began with the projection of a skyline sketch onto a canvas. The sketch was outlined in chalk and then painted in. / ' +
  'Price ~ 500$ ',
  'Canvas #53 - 11 x 14 in / "Landscape Series" / April 2019 / This canvas is part of 10 panel series recreating a winter' +
  ' mountain landscape / Status ~ For Sale / Price ~ 50$',
  'Canvas #54 - 11 x 14 in / "Technique Series" / This work explores use of repeated strokes. Layer upon layer of paint ' +
  'was applied using a feather brush to smear, swirl and blend the colors. / Status ~ Sold / Price ~ $0'
];

export default class Acrylics extends Component {

  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  openModal = (num, canvas) => {
    this.num = num;
    this.canvas = canvas;
    this.setState({ photoIndex: +num,
      isOpen: true });
  };

  render() {
    const { photoIndex, isOpen } = this.state;

    return (
      <div>
        <div className="acrylics autoZoom" tabIndex="-1" role="group">
          <figure className="figure">
            <svg id="figure1">
              <image id="48"
                     xlinkHref="images/0048.jpg"
                     width="105" height="140" x="728" y="0" opacity="1"
                     onClick={() => this.openModal(0,"Canvas #48")}
              >
                <animate attributeName="x" dur="60s" values="728;0"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="49"
                     xlinkHref="images/0049.jpg"
                     width="105" height="140" x="640" y="0" opacity="1"
                     onClick={() => this.openModal(1,"Canvas #49")}
              >
                <animate attributeName="x" dur="60s" values="640;-88"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="50"
                     xlinkHref="images/0050.jpg"
                     width="105" height="140" x="552" y="0" opacity="1"
                     onClick={() => this.openModal(2,"Canvas #50")}
              >
                <animate attributeName="x" dur="60s" values="552;-176"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="51"
                     xlinkHref="images/0051.jpg"
                     width="105" height="140" x="464" y="0" opacity="1"
                     onClick={() => this.openModal(3,"Canvas #51")}
              >
                <animate attributeName="x" dur="60s" values="464;-264"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="52"
                     xlinkHref="images/0052.jpg"
                     width="105" height="140" x="376" y="0" opacity="1"
                     onClick={() => this.openModal(4,"Canvas #52")}
              >
                <animate attributeName="x" dur="60s" values="376;-352"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="53"
                     xlinkHref="images/0053.jpg"
                     width="105" height="140" x="288" y="0" opacity="1"
                     onClick={() => this.openModal(5,"Canvas #53")}
              >
                <animate attributeName="x" dur="60s" values="288;-440"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="0054-release.jpg"
                     xlinkHref="images/0054.jpg"
                     width="105" height="140" x="200" y="0" opacity="1"
                     onClick={() => this.openModal(6,"Canvas #54")}
              >
                <animate attributeName="x" dur="60s" values="200;-528"
                         repeatCount="indefinite"></animate>
              </image>
            </svg>
          </figure>
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) < images.length ? (photoIndex + 1) : 0]}
            prevSrc={images[(photoIndex - 1) > 0 ? (photoIndex - 1) : images.length - 1]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex - 1) > 0 ? (photoIndex - 1) : images.length - 1
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) < images.length ? (photoIndex + 1) : 0
              })
            }
          />
        )}
      </div>
    );
  }

}