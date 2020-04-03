import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './services/service.redux'

import AppComponent from './component/app/component.app'


ReactDOM.render(
    <Provider store={store}>
        <AppComponent/>
    </Provider>,
    document.getElementById('root')
);