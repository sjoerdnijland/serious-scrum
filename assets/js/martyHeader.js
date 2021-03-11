import React from 'react';

class MartyHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "editorialHeader row";

        if(this.props.label != 'Marty'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Serious Scrum</div>
                        <h1>Marty De Jonge</h1>
                        <p className="_pt20 _pl40 buttonContainer"><a className="button" id="requestInvite_button" href="https://www.linkedin.com/in/martydejonge/" target="_blank">Connect on LinkedIn</a></p>

                    </div>
                </div>


        );
    }
}
window.MartyHeader = MartyHeader;