import React from 'react';

class ScrumBut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const ContainerClassName = "scrumbut row _pt20 _pl40";

        return (
            <div className={ContainerClassName}>
                <div className="row _ml40 _mt10">

                    <div className="column">
                        <iframe src="https://player.vimeo.com/video/343264222?quality=1080p" width="640" height="360" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                    </div>

                </div>
            </div>


        );
    }
}
window.ScrumBut = ScrumBut;