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
                        <h1>The Valley of Values</h1>
                        <div>
                            It’s about to get real hot! We are going to study volcanic activity and impact craters in this valley.<br/>
                        </div>

                    </div>
                </div>


        );
    }
}
window.R2MScrumValues = R2MScrumValues;