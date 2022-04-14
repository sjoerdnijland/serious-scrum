import React from 'react';

class R2MScrumMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_scrummaster row";

        if(this.props.label != 'scrum-master'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Mountaineering Scrum</h1>
                        <div>
                            This Adventure is still in the works! Stay tuned!<br/>
                        </div>
                    </div>
                </div>


        );
    }
}
window.R2MScrumMaster = R2MScrumMaster;