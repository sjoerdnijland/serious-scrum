import React from 'react';

class R2MSelfmanagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_selfmanaging row";

        if(this.props.label != 'selfmanaging'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Self-Management</h1>
                        <div>
                            Survival skills for self-managing Scrum Teams!
                        </div>

                    </div>
                </div>


        );
    }
}
window.R2MSelfmanagement = R2MSelfmanagement;