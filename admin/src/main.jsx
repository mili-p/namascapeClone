import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js'
import 'sweetalert2/src/sweetalert2.scss'
import ErrorBoundry from './components/ErrorBoundary'
import swDev from './swDev.js';

// remove All Errors/Logs/Debug Mode For Production Build Added AMIT- 06-11-2023

// if (import.meta.env.VITE_APP_ENVIRONMENT=== 'production') {
//   console.log = () => {}
//   console.error = () => {}
//   console.debug = () => {}
// }

ReactDOM.createRoot(document.getElementById('root')).render(
     <Provider store={store}>
      {/* <ErrorBoundry> */}
  <BrowserRouter basename={import.meta.env.VITE_APP_BASENAME}>
    <App />
  </BrowserRouter>
      {/* </ErrorBoundry> */}
     </Provider>
)
swDev();

