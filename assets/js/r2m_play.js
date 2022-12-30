import '../css/app.scss';
import '../js/r2m_play_blanks';

import React from 'react';
import ReactDOM from 'react-dom';

class R2m_play extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            play: this.props.data.play
        };
    }

    render() {

        const appContainerClassName = "appContainer";
        const contentClassName = "pageContent ";

        return (
            <div className={appContainerClassName}>
                <R2MPlayBlanks module={this.state.play}/>
            </div>
        )
    }
}


const root = document.getElementById('root');
const data =  JSON.parse(root.dataset.preload);

ReactDOM.render(<R2m_play data={data} />, root);