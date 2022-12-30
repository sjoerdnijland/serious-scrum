import '../css/play.scss';
import '../js/r2m_play_blanks';

import React from 'react';
import ReactDOM from 'react-dom';
import playConfig from "../json/play_config.json";

class R2m_play extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            play: this.props.data.play,
            playId: this.props.data.playId
        };
    }

    render() {
        let config = playConfig;

        if(this.state.playId && this.state.play){
            config = playConfig[this.state.play][this.state.playId];
        }else if(this.state.play){
            config = playConfig[this.state.play];
        }else{
            //no play set
        }

        const appContainerClassName = "appContainer";

        return (
            <div className={appContainerClassName}>
                <R2MPlayBlanks play={this.state.play} playId={this.state.playId} config={config}/>
            </div>
        )
    }
}


const root = document.getElementById('root');
const data =  JSON.parse(root.dataset.preload);

ReactDOM.render(<R2m_play data={data} />, root);