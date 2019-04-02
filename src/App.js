import React, { Component } from 'react'
// styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './Styles/Css/Layout.css'
// components
import SearchBox from './Components/SearchBox.js'
import Navigator from './Components/Navigator.js'

class App extends Component {

    render () {
        return (
            <div>
                {<SearchBox {...this.props}/>}
                <Navigator {...this.props}/>
            </div>
        )
    }
}

export default App
