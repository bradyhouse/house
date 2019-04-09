import React, { Component } from 'react';
import Modal from 'react-modal';
import './content.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');


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

  openModal(num, canvas) {
    this.num = num;
    this.canvas = canvas;
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div className="container">
            <img height={this.canvasHeight} src={this.canvas} alt="Canvas #{48}"></img>
          </div>
        </Modal>
        <div className="content" tabIndex="-1" role="group">
          <figure className="figure">
            <svg id="figure1">
              <image id="48"
                     xlinkHref="images/0048.jpg"
                     width="105" height="140" x="0" y="0" opacity="1"
                     onClick={() => this.openModal("48","images/0048.jpg")}
                     >
                <animate attributeName="opacity" dur="229s" values="1;.9;.8;.7;.6;.5;.6;.7;.8;.9"
                         repeatCount="indefinite"></animate>
                <animate attributeName="x" dur="60s" values="0;728"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="49"
                     xlinkHref="images/0049.jpg"
                     width="105" height="140" x="-88" y="0" opacity="1"
                     onClick={() => this.openModal("49","images/0049.jpg")}
              >
                <animate attributeName="opacity" dur="146s" values="1;.9;.8;.7;.6;.5;.6;.7;.8;.9"
                         repeatCount="indefinite"></animate>
                <animate attributeName="x" dur="60s" values="-88;640"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="50"
                     xlinkHref="images/0050.jpg"
                     width="105" height="140" x="-176" y="0" opacity="1"
                     onClick={() => this.openModal("50","images/0050.jpg")}
              >
                <animate attributeName="opacity" dur="192s" values="1;.9;.8;.7;.6;.5;.6;.7;.8;.9"
                         repeatCount="indefinite"></animate>
                <animate attributeName="x" dur="60s" values="-176;552"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="51"
                     xlinkHref="images/0051.jpg"
                     width="105" height="140" x="-264" y="0" opacity="1"
                     onClick={() => this.openModal("51","images/0051.jpg")}
              >
                <animate attributeName="opacity" dur="237s" values="1;.9;.8;.7;.6;.5;.6;.7;.8;.9"
                         repeatCount="indefinite"></animate>
                <animate attributeName="x" dur="60s" values="-264;464"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="52"
                     xlinkHref="images/0052.jpg"
                     width="105" height="140" x="-352" y="0" opacity="1"
                     onClick={() => this.openModal("52","images/0052.jpg")}
              >
                <animate attributeName="opacity" dur="60s" values="1;.9;.8;.7;.6;.5;.6;.7;.8;.9"
                         repeatCount="indefinite"></animate>
                <animate attributeName="x" dur="60s" values="-352;376"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="53"
                     xlinkHref="images/0053.jpg"
                     width="105" height="140" x="-440" y="0" opacity="1"
                     onClick={() => this.openModal("53","images/0053.jpg")}
              >
                <animate attributeName="opacity" dur="148s" values="1;.9;.8;.7;.6;.5;.6;.7;.8;.9"
                         repeatCount="indefinite"></animate>
                <animate attributeName="x" dur="60s" values="-440;288"
                         repeatCount="indefinite"></animate>
              </image>
              <image id="0054-release.jpg"
                     xlinkHref="images/0054.jpg"
                     width="105" height="140" x="-528" y="0" opacity="1"
                     onClick={() => this.openModal("54","images/0054.jpg")}
              >
                <animate attributeName="opacity" dur="169s" values="1;.9;.8;.7;.6;.5;.6;.7;.8;.9"
                         repeatCount="indefinite"></animate>
                <animate attributeName="x" dur="60s" values="-528;200"
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