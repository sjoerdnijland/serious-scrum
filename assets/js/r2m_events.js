import React from 'react';

class R2MEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_events row";

        if(this.props.label != 'smooth-sailing'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Smooth Sailing the Events</h1>
                        <div>
                          Playtime!<br/>
                        </div>
                    </div>
                </div>
        );
    }
}
window.R2MEvents = R2MEvents;