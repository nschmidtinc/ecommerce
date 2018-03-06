import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import flatten from "flat";
import { GetDate } from "./requests";
import { GetTime } from "./requests";
const ButtonStyles = css``;
const TableWrapper = styled.div`
  overflow: auto;
  max-width: calc(100% - 20px);
  padding: 10px;
`;
const Customers = styled.table`
  text-align: center;
  padding: 0;
  z-index: 1;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse
  width: 100%;
  border-spacing: 0;
`;
const Select = styled.select`
  height: 35px;
  width: 150px;
  font-size: 1rem;
`;
const SuperH1 = styled.div`
  color: blue;
  opacity: 8;
`;
const Wrapper = styled.div`
  background-image: url(./restaurant-wine-glasses-served-51115.jpeg);
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.9;
  height: 100%;
  justify-content: center;
`;
const TableLink = styled(Link)`
  text-decoration: none;
  color: black;
  background: #fff;
  border-radius: 5px;
  display: inline-block;
  padding: 3px;
  margin-top: 10px;
  margin: 10px auto;
`;
const Ths = styled.th`
  padding: 0;
  color: white;
  font-size: 2rem;
`;
const Ths2 = styled.th`
  padding: 0;
  z-index: 1;
  color: white;
`;
const HiddenDiv = styled.div`
  display: none;
  color: grey;
`;
const CustomersTd = styled.td`
  text-align: left;
  background-color: grey;
  color: white;
  box-shadow: 0 0 0 1px #fff;
  height: 100px;
  width: 100px;
`;
const DeleteButton = styled.button`
  color: black;
`;
const customersTr = styled.tr`
nth-child(even){background-color: #f2f2f2;

	padding: 10px;
	font-size: 1rem;
	color: green
	background: white;
	border-radius: 10px;
	transition: all 0.2s ease-in-out;
	&:hover {
		background: red;
		color: white;
  }
  &:onClick {
    background: brown;
    transition: all 0.2s ease-in-out;
  }
`;
const StyledButton = styled.div`
  background: blue;
  padding: 20px;
  max-width: 20px;
  max-height: 20px;
  color: ${props => props.color};
`;

const Button = ({ onClick, children, color }) => (
  <StyledButton color={color} onClick={onClick}>
    {children}
  </StyledButton>
);

const customersTh = styled.th`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;

  background-color: #4caf50;
  color: white;
`;
const FormDiv = styled.div`
  display: flex;
  text-align: center;
  display: flex;
  align-items: center;
  margin: 0 50%;
`;

// const HoriSideBar = styled.div`
//  opacity: 0.3;
// height: 72%;
//   width: 100%;
//   display: flex;
//   justify-content: right;
//   margin-left: 14%;

//   display: inline-right;
//   position: fixed;
//   z-index: 0
//   top: 0;
//   left-margin: 15%;

//   background-color: blue;
//   overflow-x: hidden;
//   padding-top: 20px;
//   padding-right: 0px;
//   &:hover {
//     background: black;
//     color: white;
//     opacity: 0.6;
//   }
// `;
// const SideBar = styled.div`
//  opacity: 0.3;
// height: 100%;
//   width: 160px;
//   position: fixed;
//   z-index: -1
//   top: 0;
//   left: 0;
//   display: flex;
//   align-items: space between;
//   background-color: blue;
//   overflow-x: hidden;
//   padding-top: 20px;
//   padding-right: 0px;
//   &:hover {
//     background: black;
//     color: white;
//     opacity: 0.6;
//   }
// `;

const TDdiv = styled.div`
  text-align: center;
`;
const TDResDiv = styled.div`
  color: yellow;
`;
const CustomersGTd = styled.td`
  background: grey;
  opacity: 0.6;
  box-shadow: 0 0 0 1px #fff;
`;

const MainDiv = styled.div`
  width: 78%;
  postion: relative;
  float: left;
  height: 85%;
  background: green;
`;
const Funky = styled.div`
  display: hidden;
  padding: 5px 5px;

  background: pink;
`;
const StyleButton = styled.div`
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  width: 100%;
  font-size: 25px;
  color: pink;
  display: block;
`;

function getDecimalTime(time) {
  const decimalTime = time.split(":");
  return Number(decimalTime[0]) + (decimalTime[1] === "30" ? 0.5 : 0);
}

function formatDecimalTime(decimalTime) {
  return decimalTime % 1 === 0
    ? `${decimalTime}:00`
    : `${Math.floor(decimalTime)}:30`;
}

function makeTimeMap(openingTime, closingTime) {
  let timeStamp = getDecimalTime(openingTime);
  const end = getDecimalTime(closingTime);
  const timeMap = {};
  while (timeStamp < end) {
    timeMap[formatDecimalTime(timeStamp)] = {
      twoSeat: [],
      fourSeat: [],
      sixSeat: [],
      eightSeat: []
    };
    timeStamp += 0.5;
  }
  return timeMap;
}

function formatKey(key) {
  const words = key.split(/[A-Z]/);
  return `${words[0].charAt(0).toUpperCase()}${words[0].substr(1)} ${"s" +
    words[1]}`;
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTime: "3:00",
      closeTime: "22:00",
      date: "2018-12-30",
      resButtons: {},
      maxSeats: 9,
      loggedIn: true,
      userNumber: "450-901-1234",
      displayTableTime: "4:00",

      allReservations: [
        {
          "+15148884269": {
            "2018-12-30/10:30": {
              client: "Timmy",
              phoneNumber: "+15149804269",
              restaurant: "McDonald's",
              city: "Montréal",
              nbOfPeople: "3 people",
              nbSeats: 4,
              date: "2018-12-30",
              time: "10:30",
              hourIn: 10.5,
              hourOut: 11.5,
              isOver: false,
              isCancelled: false
            }
          }
        },
        {
          "+15148884269": {
            "2018-12-30/10:30": {
              client: "Timmy",
              phoneNumber: "+15149804269",
              restaurant: "McDonald's",
              city: "Montréal",
              nbOfPeople: "3 people",
              nbSeats: 4,
              date: "2018-12-30",
              time: "10:30",
              hourIn: 10.5,
              hourOut: 11.5,
              isOver: false,
              isCancelled: false
            }
          }
        },
        {
          "+15148884269": {
            "2018-12-30/10:30": {
              client: "Timmy",
              phoneNumber: "+15149804269",
              restaurant: "McDonald's",
              city: "Montréal",
              nbOfPeople: "3 people",
              nbSeats: 4,
              date: "2018-12-30",
              time: "10:30",
              hourIn: 10.5,
              hourOut: 11.5,
              isOver: false,
              isCancelled: false
            }
          }
        }
      ],
      tables: {},
      tablelayout: {
        twoSeat: 9,
        fourSeat: 6,
        sixSeat: 8,
        eightSeat: 8
      },
      time: makeTimeMap("3:00", "12:30")
    };
    //update time
    // this.setState({ time: { ...this.state.time, [timeStamp]: obj }})
    console.log(this.state.time);
  }
  handleDelete = (index, array) => {
    console.log("this should be 0", index);
    console.log("this should be eight", array);

    let clientNumber = this.state.time[this.state.displayTableTime][array][
      index
    ].phoneNumber;
    let time = this.state.displayTableTime;
    let date = this.state.date;

    fetch("/cancelReservation", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        clientNumber,
        date,
        time
      })
    }).then(() => this.handleChange(time));
    console.log(clientNumber, time, date);
  };

  handleChange = async value => {
    let viewTime = value;
    let timeTables = this.state.tables;
    console.log(viewTime);

    this.setState({ displayTableTime: viewTime });
    console.log(this.state.displayTableTime);
    const response = await fetch("/displayReservations", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        restoPhone: "450-901-1234",
        date: this.state.date,
        time: this.state.displayTableTime
      })
    });
    console.log("got response", response);
    let data = await response.text();
    console.log("got data", data);
    let arr123 = JSON.parse(data);
    data = arr123.map(res => flatten(res)).map(res =>
      Object.keys(res).reduce((acc, key) => {
        const keys = key.split(".");
        return { ...acc, [keys[keys.length - 1]]: res[key] };
      }, {})
    );

    this.setState({
      data: data.map(
        e =>
          (e = {
            clientNumber: e.phoneNumber,
            time: this.state.displayTableTime,
            date: this.state.date,
            isDeleted: false,
            tableType: e.nbSeats
          })
      )
    });
    console.log("here is my data", data, this.state.data);
    console.log("view time", viewTime);
    console.log("this object goes inside", timeTables);
    console.log(this.state.tablelayout);
    console.log("this is the object", this.state.time[viewTime]);
    const seatMap = Object.keys(this.state.tablelayout).reduce(
      (acc, key, idx) => {
        const nbTables = this.state.tablelayout[key];
        const nbSeats = (idx + 1) * 2;
        const resKey = "a" + Math.floor(Math.random() * 100);
        let arr = data.filter(res => res.nbSeats === nbSeats);
        while (arr.length < nbTables) {
          arr.push({
            client: "Empty",
            phoneNumber: "",
            isReserved: false,
            fontIsPink: true,
            hasbutton: true,
            hasDelete: false,
            buttonKey: resKey
          });
          this.setState(st => ({
            resButtons: { ...st.resButtons, [resKey]: true }
          }));
        }
        while (arr.length < 9) {
          arr.push({
            isGrey: true
          });
        }
        return { ...acc, [key]: arr };
      },
      {}
    );
    this.setState(st => ({
      time: { ...st.time, [viewTime]: seatMap }
    }));
  };

  // updateTables = (tableType, tableNumber) => {
  //   let emptyObject = {
  //     client: "Empty",
  //     phoneNumber: ""
  //   };
  //   let table = new Array(tableNumber);

  //   console.log("inside update tables", tableType, tableNumber);
  //   table.fill(emptyObject, 0, tableNumber);
  //   console.log("this is going in the state", table);
  //   this.setState(
  //     st => ({ tables: { ...st.tables, [tableType]: table } }),
  //     () => console.log("here i am!", this.state.tables)
  //   );
  // };

  GetDate = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() < 10 ? "0" : "") + (date.getMonth() + 1); // +1 because January is 0
    let day = (date.getDay() < 10 ? "0" : "") + date.getDay();
    date = year + "-" + month + "-" + day;
    return date;
  };
  componentDidMount() {
    const seatMap = Object.keys(this.state.tablelayout).reduce(
      (acc, key, idx) => {
        const nbTables = this.state.tablelayout[key];
        const nbSeats = (idx + 1) * 2;
        let arr = [];
        while (arr.length < nbTables) {
          arr.push({
            client: "Empty",
            phoneNumber: "",
            hasDelete: false
          });
        }
        while (arr.length < 9) {
          arr.push({
            isGrey: true
          });
        }
        return { ...acc, [key]: arr };
      },
      {}
    );
    console.log(seatMap);
    console.log(this.state.displayTableTime);
    this.setState(
      st => ({
        time: { ...st.time, [this.state.displayTableTime]: seatMap }
      }),
      () => console.log("after didmount", this.state.time)
    );
    // let numberTwoSeat = this.state.tablelayout.twoSeat;
    // let numberFourSeat = this.state.tablelayout.fourSeat;
    // let numberSixSeat = this.state.tablelayout.sixSeat;
    // let numberEightSeat = this.state.tablelayout.eightSeat;

    // this.updateTables("twoSeat", numberTwoSeat);
    // this.updateTables("fourSeat", numberFourSeat);
    // this.updateTables("sixSeat", numberSixSeat);
    // this.updateTables("eightSeat", numberEightSeat);
    console.log(this.state.tables);
    console.log("this is time", this.state.time);
  }
  render() {
    console.log(this.state.time);
    return (
      <Wrapper>
        <FormDiv>
          <form>
            <Select
              name="timeTable"
              onChange={e => this.handleChange(e.target.value)}
              value={this.state.displayTableTime}
            >
              {Object.keys(this.state.time).map(instance => (
                <option value={instance}>{instance}</option>
              ))}
            </Select>
          </form>
        </FormDiv>
        <TableWrapper>
          <Customers id="customers">
            <tr>
              <Ths> </Ths>
              <Ths>1</Ths>
              <Ths>2</Ths>
              <Ths>3</Ths>
              <Ths>4</Ths>
              <Ths>5</Ths>
              <Ths>6</Ths>
              <Ths>7</Ths>
              <Ths>8</Ths>
              <Ths>9</Ths>
            </tr>
            {Object.keys(this.state.time[this.state.displayTableTime]).map(
              tableType => (
                <tr key={`${tableType}_tr`}>
                  <Ths2>{formatKey(tableType)} Tables</Ths2>
                  {this.state.time[this.state.displayTableTime][tableType].map(
                    e =>
                      e.hasDelete == false ? (
                        <CustomersTd>
                          <TDdiv>
                            {e.client} <div>{e.phoneNumber}</div>
                            <TableLink to="/makeres">Reservation</TableLink>
                            <div />
                          </TDdiv>
                        </CustomersTd>
                      ) : e.isGrey ? (
                        <CustomersGTd />
                      ) : (
                        <CustomersTd>
                          <TDResDiv>
                            {e.client} <div>{e.phoneNumber}</div>
                            <HiddenDiv>
                              {
                                (e.buttonKey = this.state.time[
                                  this.state.displayTableTime
                                ][tableType].indexOf(e))
                              }
                              {(e.array = [tableType])}
                            </HiddenDiv>
                            <div>
                              <button
                                onClick={() =>
                                  this.handleDelete(e.buttonKey, e.array)
                                }
                              >
                                delete
                              </button>
                            </div>
                          </TDResDiv>
                        </CustomersTd>
                      )
                  )}
                </tr>
              )
            )}
            {/* <tr>
            <th>Four Seat Tables</th>
            {this.state.tables["fourSeat"].map(e => (
              <CustomersTd key={e}>
                {e}{" "}
                <TDdiv>
                  <button>delete</button>
                </TDdiv>
              </CustomersTd>
            ))}
          </tr>
          <tr>
            <th> Six Seat Tables</th>
            {this.state.tables["sixSeat"].map(e => (
              <CustomersTd>
                <TDdiv>
                {e}{" "}
                <div>
                  <button>delete</button>
                </div>
                
                </TDdiv>
              </CustomersTd>
            ))}
          </tr>
          <tr>
            <th>Eight Seat Tables</th>
            {this.state.tables[]["eightSeat"].map(e => (
              <CustomersTd>
                <TDdiv>
                {e}{" "}
                <div>
                  <button>delete</button>
                </div>
                </TDdiv>
              </CustomersTd>
            ))}
          </tr> */}
          </Customers>
        </TableWrapper>
      </Wrapper>
    );
  }
}

export default HomePage;
