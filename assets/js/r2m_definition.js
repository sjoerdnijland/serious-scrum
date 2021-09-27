import React from 'react';

class R2MDefinition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_definition row";

        if(this.props.label != 'definition'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Definition of Scrum</h1>
                        <div>
                            Let's develop a <i>shared understanding</i> on Scrum<br/>
                        </div>
                       
                    </div>
                </div>


        );
    }
}
window.R2MDefinition = R2MDefinition;