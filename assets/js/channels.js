import React from 'react';

class Channels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const ContainerClassName = "channels row _pt20 _pl40";
        const tsunamiLogo = "images/tsunami-of-sense.svg";

        return (
            <div className={ContainerClassName}>
                <div className="row _ml40 _mb40">
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