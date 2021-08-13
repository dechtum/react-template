import React, { Component, useRef } from 'react'
import QrReader from 'modern-react-qr-reader'
import './css.css'

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ''
    }
    this.handleError = this.handleError.bind(this);
    this.handleScan = this.handleScan.bind(this);
  }

  handleScan = data => {
    if (data) {
      this.state.result = data;
      console.log(this.state.result);
      this.setState({ result: data });
      alert(data)
    }
  }

  handleError = err => {

    console.error(err)
  }

  render() {
    return (
      <div className="paneQrReader">
        <div className="QrReader">
          <QrReader
            delay={300}
            facingMode={"environment"}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '100%' }}
          />
        </div>
        <div className="maskQrReader d-flex flex-column align-items-center justify-content-center">
          <h4>MCS</h4>
          <div></div>
          <h6>Scan QR Code</h6>
        </div>

        <p style={{ width: '100%', color: 'white' }} className="text-center pt-1">{this.state.result}</p>
      </div>
    )
  }
}

export function Scaner() {
  return (
    <Test />
  )
}

