import '../css/app.scss';
import '../js/header.js';
import '../js/tsunami.js';
import '../js/meetup.js';
import '../js/meetup-past.js';
import '../js/channels.js';
import '../js/medium.js';
import '../js/slack.js';
import '../js/scrumbut.js';
import '../js/content.js';
import '../js/whySoSerious.js';
import '../js/editor.js';
import '../js/dod.js';
import '../js/divider.js';
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
                <Tsunami/>
                <Channels/>
                <MeetupPast/>
                <Content/>
                <Build/>
            </div>
        )
    }
}


const root = document.getElementById('root');
const data =  JSON.parse(root.dataset.preload);

ReactDOM.render(<App data={data} />, root);
