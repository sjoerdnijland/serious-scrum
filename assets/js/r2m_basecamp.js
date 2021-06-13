import React from 'react';

class R2MBasecamp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_basecamp row";

        if(this.props.label != 'basecamp'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Basecamp</h1>
                        <div>
                            Welcome to the basecamp travelers!<br/>
                            Here, you will prepare and get packed before setting forth with your training.
                        </div>
                        <p className="_pt20 _pl40 buttonContainer"><a className="button" id="requestInvite_button" href="https://docs.google.com/forms/d/e/1FAIpQLSdE_NU4ivUST_XmFAmjW6ljFPyH74X9QjY_JfPr0NUIKTTffQ/viewform?usp=sf_link" target="_blank">Sign up here!</a></p>

                    </div>
                </div>


        );
    }
}
window.R2MBasecamp = R2MBasecamp;