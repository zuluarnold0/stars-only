//packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

//local
import App from './components/App';
import { store } from './store/store';
import * as registerServiceWorker from './registerServiceWorker';

//make redux-global-state available to all app components
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById("root")
);

registerServiceWorker.unregister();