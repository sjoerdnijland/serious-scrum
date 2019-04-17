import React from 'react';

class Channels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        var ContainerClassName = "channels row _pt20 _pb20 _pl40";
        var tsunamiLogo = "images/tsunami-of-sense.svg";

        return (
            <div className={ContainerClassName}>
                <div className="row _ml40">
                    <h1>a tsunami of sense <img className='tsunami' src={tsunamiLogo}/> </h1>
                </div>
                <div className="row _ml40 _mr40">
                    <p>We are a professional community committed to <i>helping each other</i> in environments in which Scrum is not yet fully adopted and understood.</p>
                </div>
                <div className="row _ml40">
                    <div className="one-half column">
                        <Medium/>
                    </div>
                    <div className="one-half column">
                        <Slack/>
                    </div>
                </div>
            </div>


        );
    }
}
window.Channels = Channels;