import {render} from 'react-dom';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import App from './components/App';

const appContainer = document.getElementById('app');


const router = <Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>


render(router, appContainer);
