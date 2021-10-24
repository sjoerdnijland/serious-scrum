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
                    </div>
                </div>


        );
    }
}
window.R2MBasecamp = R2MBasecamp;