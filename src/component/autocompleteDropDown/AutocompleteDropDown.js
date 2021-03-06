import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import counterpart from 'counterpart';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AutocompleteDropDown.css'
import en from './../../lang/en';
import fi from './../../lang/fi';

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('fi', fi);
counterpart.setLocale('en');

class AutocompleteDropDown extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);
    
    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
    if (this.props.data.currecyTypeLocale) {
      this.props.data.changeCurrency(e.currentTarget.innerText)
    } else {
      this.props.data.changeExcurrency(e.currentTarget.innerText)
    }
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
      if (this.props.data.currecyTypeLocale) {
        this.props.data.changeCurrency(filteredSuggestions[activeSuggestion])
      } else {
        this.props.data.changeExcurrency(filteredSuggestions[activeSuggestion])
      }
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    

    let suggestionsListComponent;
    const no_currecny_found = counterpart.translate('no_currecny_found');
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>{no_currecny_found}</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          placeholder={this.props.data.placeholderText}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput || ""}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default AutocompleteDropDown;
