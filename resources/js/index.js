import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';



if (document.getElementById('dashboard')) {
    ReactDOM.render(<Home />, document.getElementById('dashboard'));
}