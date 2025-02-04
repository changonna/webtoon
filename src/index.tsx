import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './features/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './global.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
