import React from 'react';
import ReactDom from 'react-dom';
import AutocompleteDropDown from '../AutocompleteDropDown';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

test("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<AutocompleteDropDown data={{placeholderText: "test"}}></AutocompleteDropDown>, div);
})


