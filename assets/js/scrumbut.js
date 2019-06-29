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

                    <div className="one-half column logo-min-width">
                        <iframe src="https://player.vimeo.com/video/343264222?quality=1080p" width="640" height="360" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                    </div>
                    <div className="one-half column _pl40 _pr40">
                        <br/>
                        <br/>
                        <p>We curated a list of 100 ScrumButs with the intention to kicking every single one of them. Can you help fellow practitioners share you tips and helpful material for these?</p>
                        <br/>
                        <p className="_pt20 buttonContainer"><a href="https://medium.com/serious-scrum/100-scrumbuts-value-down-the-drain-3e470d9e3623" target="_blank" className="button">Kicking ONE HUNDRED ScrumButs</a></p>

                     </div>

                </div>
            </div>


        );
    }
}
window.ScrumBut = ScrumBut;