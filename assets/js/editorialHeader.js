import React from 'react';

class EditorialHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "editorialHeader row";

        if(this.props.label != 'editorial'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Serious Scrum</div>
                        <h1>Editorial</h1>
                        <p className="_pt20 _pl40 buttonContainer"><a className="button" id="requestInvite_button" href="/about-serious-scrum" target="_blank">About Serious Scrum</a></p>

                    </div>
                </div>


        );
    }
}
window.EditorialHeader = EditorialHeader;