import React from 'react';

class R2MDeveloper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_developer row";

        if(this.props.label != 'developer'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (
                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Developer</h1>
                        <div>
                            This Chapter is work-in-progress. Stay tuned for more!<br/>
                            Everything in Scrum is designed to enable and empower Developers. <br/>
                        </div>
                    </div>
                </div>
        );
    }
}
window.R2MDeveloper = R2MDeveloper;