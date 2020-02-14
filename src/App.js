import React, { Component } from "react";
import AutocompleteDropDown from "./component/AutocompleteDropDown";
import { Button, Alert } from "react-bootstrap";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currency: "",
      excurrency: "",
      amount: "",
      result: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  changeCurrency(currency) {
    this.setState({ currency: currency });
  }

  changeExcurrency(excurrency) {
    this.setState({ excurrency: excurrency });
  }

  async onChange(e) {
    this.setState({
          [e.target.name]: e.target.value
      });
  }

  getExchangeAmount = () => {
    var url =
      "http://localhost:8080/excurrency?currency=" +
      this.state.currency +
      "&exCurrency=" +
      this.state.excurrency +
      "&amount=" +
      this.state.amount;
    axios({
      method: "GET",
      url: url
    }).then(response => {
      this.setState({
        result: response.data
      })
    })
    .catch((error) => {
        // handle this error
        console.log('error: '+error);
    })
  }

  render() {
    return (
      <div className="App">
        <Alert className="alart" variant="success">
          <h2>Currency converter</h2>
        </Alert>
        <AutocompleteDropDown
          data={{
            changeCurrency: this.changeCurrency.bind(this),
            changeExcurrency: this.changeExcurrency.bind(this),
            currecyType: "locale",
            placeholderText: "local currency"
          }}
          suggestions={currecyData}
        />
        <br />
        <br />
        <AutocompleteDropDown
          data={{
            changeCurrency: this.changeCurrency.bind(this),
            changeExcurrency: this.changeExcurrency.bind(this),
            currecyType: "exchange",
            placeholderText: "exchange currency"
          }}
          suggestions={currecyData}
        />
        <br />
        <br />
        <input
          id="amount"
          name="amount"
          type="text"
          value={this.state.amount}
          placeholder="amount in digit"
          onChange={this.onChange}
        ></input>
        <br />
        <br />
        <Button
          onClick={() => {
            this.getExchangeAmount();
          }}
          variant="primary"
        >
          Show exchanged amount
        </Button>
        <br />
        <br />
        <textarea className={"textarea"} value={this.state.result} readOnly />
      </div>
    );
  }
}

export default App;

const currecyData = [
  "AED",
  "ARS",
  "AUD",
  "BGN",
  "BRL",
  "BSD",
  "CAD",
  "CHF",
  "CLP",
  "CNY",
  "COP",
  "CZK",
  "DKK",
  "DOP",
  "EGP",
  "EUR",
  "FJD",
  "GBP",
  "GTQ",
  "HKD",
  "HRK",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "ISK",
  "JPY",
  "KRW",
  "KZT",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PAB",
  "PEN",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "RON",
  "RUB",
  "SAR",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "TWD",
  "UAH",
  "USD",
  "UYU",
  "ZAR"
];