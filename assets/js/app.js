import '../css/app.scss';
import '../js/header.js';
import '../js/build.js';

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {

        const functions = {};

        console.log(this.props.data);

        return (
            <div>
                <Header/>
                <Build/>
            </div>
        )
    }
}


const root = document.getElementById('root');
const data =  JSON.parse(root.dataset.preload);

ReactDOM.render(<App data={data} />, root);
