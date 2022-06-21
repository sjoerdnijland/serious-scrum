import React from 'react';

class R2MArtifacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_artifacts row";

        if(this.props.label != 'artifacts'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Exploring Artifacts</h1>
                        <div>
                          Make work visible!<br/>
                        </div>
                    </div>
                </div>


        );
    }
}
window.R2MArtifacts = R2MArtifacts;