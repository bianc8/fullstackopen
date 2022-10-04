import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom"
import store from './store'

import { MantineProvider} from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>  
    <Router>
      <MantineProvider  theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </Router>
  </Provider>
)
