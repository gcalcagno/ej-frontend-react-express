import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route } from 'react-router-dom'
// App Wrapper
import App from './App.js'

ReactDOM.render((
	<BrowserRouter>
  		<Route render={(props) => <App {...props} />}/>
	</BrowserRouter>
), document.getElementById('root'))

registerServiceWorker()
