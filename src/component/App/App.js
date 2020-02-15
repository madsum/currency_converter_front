import React, { Component } from "react";
import AutocompleteDropDown from "../autocompleteDropDown/AutocompleteDropDown";
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
      result: "",
      currecyTypeLocale: false,
      currencyError: "",
      excurrencyError: "",
      amountError: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  changeCurrency(currency) {
    this.setState({ currency: currency });
    this.setState({currencyError: ""})
  }

  changeExcurrency(excurrency) {
    this.setState({ excurrency: excurrency });
    this.setState({excurrencyError: ""})
  }

  async onChange(e) {
    this.setState({
      amount: e.target.value
    });
    this.setState({amountError: ""})
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if(this.checkFiledError()){
        this.getExchangeAmount();
      }
    }
  }

  checkFiledError(){
    var okToCall = true
    if(this.state.currency === ""){
      this.setState({currencyError: "Locale currecncy must not be empty"})
      okToCall = false
    }
   if(this.state.excurrency === ""){
        this.setState({excurrencyError: "Exchange currecncy must not be empty"})
        okToCall = false
      }
   if(this.state.amount === "" ){
        this.setState({amountError: "Amount must not be empty"})
        okToCall = false
      }
      return okToCall
  }

  getExchangeAmount = () => {
    if(this.checkFiledError()){
      var url =
        "https://currency-converter-back.herokuapp.com/excurrency?currency=" +
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
            currecyTypeLocale: true,
            placeholderText: "local currency"
          }}
          suggestions={currecyData}
        />  <label className="label">{this.state.currencyError}</label>
        <br />
        <br />
        <AutocompleteDropDown
          data={{
            changeCurrency: this.changeCurrency.bind(this),
            changeExcurrency: this.changeExcurrency.bind(this),
            currecyTypeLocale: false,
            placeholderText: "exchange currency"
          }}
          suggestions={currecyData}
        /> <label className="label"> {this.state.excurrencyError} </label>
        <br />
        <br />
        <input
          id="amount"
          name="amount"
          type="text"
          value={this.state.amount}
          placeholder="amount in digit"
          onChange={this.onChange}
          onKeyDown={this.handleKeyDown}
        ></input> <label className="label"> {this.state.amountError} </label>
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