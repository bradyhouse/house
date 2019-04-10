import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import './content.css';


class Content extends Component {


  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.num = 48;
    this.canvas = '';
    this.canvasHeight = .3 * window.innerHeight;


    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  state = {
    open: false,
  };

  openModal = (num, canvas) => {
    this.num = num;
    this.canvas = canvas;
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };


  render() {
    const { open } = this.state;
    return (
      <div>
        <Modal open={open} onClose={this.closeModal} center>
          <div className="container autoZoom">
            <img height={this.canvasHeight} src={this.canvas} alt="Canvas #${this.num}"></img>
          </div>
        </Modal>
        <div className="content autoZoom" tabIndex="-1" role="group">
          <figure className="figure">
            <svg id="figure1">
              <image id="48"
                     xlinkHref="images/0048.jpg"
                     width="105" height="140" x="728" y="0" opacity="1"
                     onClick={() => this.openModal("48","images/0048.jpg")}
              >
                <animate attributeName="x" dur="60s" values="728;0"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="49"
                     xlinkHref="images/0049.jpg"
                     width="105" height="140" x="640" y="0" opacity="1"
                     onClick={() => this.openModal("49","images/0049.jpg")}
              >
                <animate attributeName="x" dur="60s" values="640;-88"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="50"
                     xlinkHref="images/0050.jpg"
                     width="105" height="140" x="552" y="0" opacity="1"
                     onClick={() => this.openModal("50","images/0050.jpg")}
              >
                <animate attributeName="x" dur="60s" values="552;-176"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="51"
                     xlinkHref="images/0051.jpg"
                     width="105" height="140" x="464" y="0" opacity="1"
                     onClick={() => this.openModal("51","images/0051.jpg")}
              >
                <animate attributeName="x" dur="60s" values="464;-264"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="52"
                     xlinkHref="images/0052.jpg"
                     width="105" height="140" x="376" y="0" opacity="1"
                     onClick={() => this.openModal("52","images/0052.jpg")}
              >
                <animate attributeName="x" dur="60s" values="376;-352"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="53"
                     xlinkHref="images/0053.jpg"
                     width="105" height="140" x="288" y="0" opacity="1"
                     onClick={() => this.openModal("53","images/0053.jpg")}
              >
                <animate attributeName="x" dur="60s" values="288;-440"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="0054-release.jpg"
                     xlinkHref="images/0054.jpg"
                     width="105" height="140" x="200" y="0" opacity="1"
                     onClick={() => this.openModal("54","images/0054.jpg")}
              >
                <animate attributeName="x" dur="60s" values="200;-528"
                         repeatCount="indefinite"></animate>
              </image>
            </svg>
          </figure>
        </div>
      </div>
    );
  }
}

export default Content;