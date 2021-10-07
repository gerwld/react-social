import React from 'react';
import ReactDOM from 'react-dom'; 
import SocialNetworkAppJawo from './App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SocialNetworkAppJawo />, div);
    ReactDOM.unmountComponentAtNode(div);
});