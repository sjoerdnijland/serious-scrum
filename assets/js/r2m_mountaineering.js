import React from 'react';

class R2MMountaineering extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_mountaineering row";

        if(this.props.label != 'mountaineering'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Mountaineering Scrum</h1>
                        <div>
                            Getting to grips with the accountabilities in Scrum.<br/>
                        </div>
                    </div>
                </div>


        );
    }
}
window.R2MMountaineering = R2MMountaineering;