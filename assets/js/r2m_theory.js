import React from 'react';

class R2MTheory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_theory row";

        if(this.props.label != 'theory-of-scrum'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Theory of Scrum</h1>
                        <div>
                            The Pillars of Scrum<br/>
                        </div>
                    </div>
                </div>


        );
    }
}
window.R2MTheory = R2MTheory;