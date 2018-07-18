import React from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions  from '../actions';
import logo from '../assets/images/logo.png';
import { Input, Button, InputGroupAddon, InputGroup, InputGroupText } from 'reactstrap';
import { PropagateLoader } from 'react-spinners';
import socket from 'socket.io-client';
// const socketConnection = socket('ws://13.127.71.162:3000');

class TrackloadDetail extends React.Component {
  constructor(props) {
    super(props);

    this.getDropAddress = this.getDropAddress.bind(this);
    this.increaseBiddingAmount = this.increaseBiddingAmount.bind(this);
    this.decreaseBiddingAmount = this.decreaseBiddingAmount.bind(this);
    this.makeBidding = this.makeBidding.bind(this);
    this.state = {
        loading: true,
        biddingAmt: this.props.detailViewData.total_booking_amount,
        biddedAmt: this.props.detailViewData.total_booking_amount,
        min_bid_amount:this.props.detailViewData.customer_min_bid_amount,
        max_bid_amount:this.props.detailViewData.customer_max_bid_amount,
        adjustableAmount: this.props.detailViewData.bidding_increment_amount,
        list: this.props.detailViewData,
    };
  }


    getDropAddress(list){
        list = this.state.list;
        return JSON.parse(list.droparray).map((sublist,i) => {
            return(
                    <Row key={i}>
                        <Col className={"fontgrey"}>
                            <Row>
                                <Col  className={"circleDiv"} xs={1} md={1} sm={1}> <div className={"circleRed"}></div> </Col>
                                <Col  className={"circleDiv"} xs={11} md={11} sm={11}> <div>{sublist.dropoff_address}</div> </Col>
                            </Row>
                        </Col>
                    </Row>
            );
        });
    }
    increaseBiddingAmount(){
        let amt = this.state.biddingAmt;
        amt = amt + this.state.adjustableAmount;
        this.setState({biddingAmt: amt});
    }
    decreaseBiddingAmount(){
        let amt = this.state.biddingAmt;
        amt = amt - this.state.adjustableAmount;
        this.setState({biddingAmt: amt});
    }
    makeBidding(){
        let amt = this.state.biddingAmt;
        this.setState({biddedAmt: amt});
    }
    handleSocketData(){
        console.log("WS","Socket opened");
    }
    cancelBooking(){
        this.props.action({booking_id:this.state.list.booking_id});
    }

    initWebSocket(){
        // console.log("WS","Socket Called");
        // socketConnection.on('message', function (data) {
        //     console.log("WSSOCK", "Message event occur");
        //     console.log("WSSOCK", JSON.stringify(data));
        // });
        // socketConnection.emit('client connect', { party_type: 1,party_id:7 });
        // console.log("WS","Socket opened");
    }

  render() {
        console.log("DDDD", JSON.stringify(this.props.activeTab));

    let content = '';
    if( this.props.activeTab == 1 ){

        return (
            <div>
                <div className={"trackDetailDiv greybackground bottomshadow aligncenter"}>
                  <span>My Load Amount</span>
                      <InputGroup className={"centerDiv biddingGroupBtn"}>
                          <InputGroupAddon addonType="prepend">
                              <Button disabled={this.state.biddingAmt <= this.state.min_bid_amount} className={"biddingBtn styleless"} onClick={this.decreaseBiddingAmount}><i className={"fa fa-minus"}/></Button>
                          </InputGroupAddon>
                          <Input className={"aligncenter whitebackground styleless"}
                              type="text"
                              readOnly
                              value={this.state.biddingAmt}
                              placeholder="0"
                          />
                          <InputGroupAddon addonType="append">
                              <Button disabled={this.state.biddingAmt >= this.state.max_bid_amount} className={"biddingBtn styleless"} onClick={this.increaseBiddingAmount}><i className={"fa fa-plus"}/></Button>
                          </InputGroupAddon>
                          <InputGroupAddon addonType="append">
                                  <Button className={"greenbackground styleless"} disabled={this.state.biddedAmt === this.state.biddingAmt} onClick={this.makeBidding} > <i className={"fa fa-check whitetext"}/> </Button>
                          </InputGroupAddon>

                      </InputGroup>
                  <span>Bid your Load Amount</span>
            </div>
            <div className={"trackDetailDiv whitebackground aligncenter borderBottom fontlightblue"}>
                  <span>Nearby {this.state.list.driver_bidding.driver_seen} Drivers available</span>
            </div>
            <div className={"trackDetailDiv whitebackground "}>
                <Row>
                    <Col xs={12} sm={2} md={2}>
                          <img className={"detailPageImg"} src={logo} alt={"WTLogo"}/>
                    </Col>
                    <Col xs={12} sm={10} md={10} className={"text-success alignleft"}>
                            Driver starts bidding it may takes 5 to 10 minutes.<br/>
                            Please wait. Stay Cool. We will give you a best driver lowest offer.
                    </Col>
                </Row>
                <Row className={"wt_container alignleft"}>
                    <Col>{this.state.list.driver_bidding.driver_seen} Driver(s) <span  className="fontgrey">seen this load</span></Col>
                    <Col className={"alignright"}>{this.state.list.driver_bidding.bid_count} Driver(s) <span  className="fontgrey">bidded</span></Col>
                </Row>
                <Row>
                    <Col sm={{ size:6}} md={{ size:3, offset: 6 }} xs={{ size:6}}>
                            <PropagateLoader color={'#123abc'} size={12} loading={this.state.loading} />
                    </Col>
                </Row>

            </div>
            <div className={"trackDetailDiv whitebackground aligncenter"}>
                  <span > Driver Bidding........ </span>
            </div>
            <div className={"trackDetailDiv whitebackground borderDivDetailPage alignleft"}>
                  <Row>
                          <Col className="fontblue">Pickup Address</Col>
                      </Row>
                      <Row className={"fontgrey"}>
                          <Col>
                              <Row>
                                  <Col className={"circleDiv"} xs={1} md={1} sm={1}> <div className={"circleGreen"}></div> </Col>
                                  <Col  className={"circleDiv"} xs={11} md={11} sm={11}> <div>{this.state.list.pickup_address}</div> </Col>
                              </Row>
                          </Col>
                      </Row>
                      <Row>
                          <Col className="fontblue">Delivery Address</Col>
                      </Row>
                      { this.getDropAddress() }
            </div>
            <div className={"trackDetailDiv whitebackground alignleft "}>
                  <Row>
                      <Col className="fontblue"> Receipt Summary </Col>
                  </Row>
                  <Row>
                      <Col className="fontgrey" md={6}><img src={logo} alt={"CashImg"}/><i className={"fa fa-user fontblue"}/> {this.state.list.payment_type_txt}</Col>
                      <Col className={"aligncenter font-medium fontblue"} md={6}><i className="fa fa-inr fontblue" aria-hidden="true"></i>&#8377; { this.state.list.total_booking_amount}</Col>
                  </Row>
                  <div className={"aligncenter"}>
                      <a className={"text-danger cancelBtnTxt"} onClick={this.cancelBooking.bind(this)}>Cancel Booking</a>
                  </div>
            </div>
        </div>
);
}else{
    let driverImgUrl = (this.state.list.driver_image && this.state.list.driver_image.length && this.state.list.driver_image != "")?this.state.list.driver_image:logo;
    return (
        <div>
            <div className={"trackDetailMapDiv"}>

                    <div className="centerDiv whitebackground bookingStatusImage">
                        <Row>
                            <Col className={"circleDiv"} xs={4} md={4} sm={4}> <div className={"circleGreen"}></div>------------------</Col>
                            <Col className={"circleDiv"} xs={4} md={4} sm={4}> <div className={"circleGreen"}></div>------------------</Col>
                            <Col className={"circleDiv"} xs={4} md={4} sm={4}> <div className={"circleGreen"}></div>------------------</Col>
                        </Row>
                        asdfasdf
                        asdfasdfasd
                        fasdf
                        asdf<br/>
                        asdf<br/>
                        asdf<br/>

                    </div>
            </div>

            <div className={"trackDetailDiv whitebackground borderDivDetailPage alignleft"}>
                  <Row>
                          <Col className="fontblue">Pickup Address</Col>
                      </Row>
                      <Row className={"fontgrey"}>
                          <Col>
                              <Row>
                                  <Col className={"circleDiv"} xs={1} md={1} sm={1}> <div className={"circleGreen"}></div> </Col>
                                  <Col  className={"circleDiv"} xs={11} md={11} sm={11}> <div>{this.state.list.pickup_address}</div> </Col>
                              </Row>
                          </Col>
                      </Row>
                      <Row>
                          <Col className="fontblue">Delivery Address</Col>
                      </Row>
                      { this.getDropAddress() }
            </div>
            <div className={"trackDetailDiv whitebackground alignleft "}>
                  <Row>
                      <span> Driver Details</span>
                      <Col className="fontgrey" md={3}><img src={driverImgUrl} alt={"DriverImg"}/></Col>
                      <Col className={"aligncenter font-medium fontblue"} md={6}>
                          { this.state.list.driver_name}<br/>
                          {this.state.list.vehicle_name}<br/>
                          { this.state.list.driver_phone}
                      </Col>
                  </Row>
            </div>
            <div className={"trackDetailDiv whitebackground alignleft "}>
                  <Row>
                      <Col className="fontblue"> Receipt Summary </Col>
                  </Row>
                  <Row>
                      <Col className="fontgrey" md={6}><img src={logo} alt={"CashImg"}/><i className={"fa fa-user fontblue"}/> {this.state.list.payment_type_txt}</Col>
                      <Col className={"aligncenter font-medium fontblue"} md={6}><i className="fa fa-inr fontblue" aria-hidden="true"></i>&#8377; { this.state.list.total_booking_amount}</Col>
                  </Row>
            </div>
        </div>
    );
}


    return (
          {content}
    );
  }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        action: (data) => dispatch(actions.cancelBooking(data)),
    }
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(TrackloadDetail);
export { connectedApp as TrackloadDetail };
