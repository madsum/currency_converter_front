import React, { Component } from "react";
import AutocompleteDropDown from "../autocompleteDropDown/AutocompleteDropDown";
import { Button, Alert } from "react-bootstrap";
import currecyData from './allCurrency'
import axios from "axios";
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import en from './../../lang/en';
import fi from './../../lang/fi';

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('fi', fi);
counterpart.setLocale('en');

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
      amountError: "",
      lang: 'en'
    };
    this.onChange = this.onChange.bind(this);
  }

  changeCurrency(currency) {
    this.setState({ currency: currency });
    this.setState({ currencyError: "" })
  }

  changeExcurrency(excurrency) {
    this.setState({ excurrency: excurrency });
    this.setState({ excurrencyError: "" })
  }

  async onChange(e) {
    this.setState({
      amount: e.target.value
    });
    this.setState({ amountError: "" })
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (this.checkFiledError()) {
        this.getExchangeAmount();
      }
    }
  }

  checkFiledError() {
    var okToCall = true
    const currencyError_msg = counterpart.translate('currencyError_msg');
    const excurrencyError_msg = counterpart.translate('excurrencyError_msg');
    const amountError_msg = counterpart.translate('amountError_msg');
    
    if (this.state.currency === "") {
      this.setState({ currencyError: currencyError_msg })
      okToCall = false
    }
    if (this.state.excurrency === "") {
      this.setState({ excurrencyError: excurrencyError_msg })
      okToCall = false
    }
    if (this.state.amount === "") {
      this.setState({ amountError: amountError_msg })
      okToCall = false
    }
    return okToCall
  }

  getExchangeAmount = () => {
    if (this.checkFiledError()) {
      
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
          console.log('error: ' + error);
        })
    }
  }

  onLangChange = (e) => {
    this.setState({ lang: e.target.value });
    counterpart.setLocale(e.target.value);
    this.setState(s => ({
      currencyError: '',
      excurrencyError: '',
      amountError: '',
      result: ''
    }))
  }

  render() {
    const locale_placeholder = counterpart.translate('local_placeholder');
    const exchange_placeholder = counterpart.translate('exchange_placeholder');
    const amount_in_digit = counterpart.translate('amount_in_digit');
    const amount_button = counterpart.translate('amount_button');
    return (
      <div>        
        <select className="select" value={this.state.lang} onChange={this.onLangChange}>
          <option value="en">English</option>
          <option value="fi">Finnish</option>
        </select>
        <Alert className="alart" variant="success">
          <Translate content="app_name" component="h2"/>
        </Alert>

        <AutocompleteDropDown
          data={{
            changeCurrency: this.changeCurrency.bind(this),
            changeExcurrency: this.changeExcurrency.bind(this),
            currecyTypeLocale: true,
            placeholderText: locale_placeholder
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
            placeholderText: exchange_placeholder
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
          placeholder = {amount_in_digit}
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
          {amount_button}
        </Button>
        <br />
        <br />
        <textarea className={"textarea"} value={this.state.result} readOnly />
      </div>
    );
  }
}

export default App;