import React from 'react';

class R2MCoaching extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_coaching row";

        if(this.props.label != 'coaching'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Coaching 101</h1>
                        <div>
                            Coaching others during their Road to Mastery.
                        </div>

                    </div>
                </div>


        );
    }
}
window.R2MCoaching = R2MCoaching;