import React from 'react';

class R2MScrumValues extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_scrumvalues row";

        if(this.props.label != 'scrum-values'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Scrum Values</h1>
                        <div>
                            "Trust is a bit like the air we breathe, it sustains, it brings things to life, but without it... we are left gasping" -John Albrecht<br/>
                        </div>

                    </div>
                </div>


        );
    }
}
window.R2MScrumValues = R2MScrumValues;