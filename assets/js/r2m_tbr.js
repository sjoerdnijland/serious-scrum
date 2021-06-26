import React from 'react';

class R2MTBR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_tbr row";

        if(this.props.label != 'basecamp'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Training from the BACK of the Room!</h1>
                        <div>
                            The “Gold Standard” for (virtual) instruction and learning.<br/>
                        </div>
                        <p className="_pt20 _pl40 buttonContainer"><a className="button" id="requestInvite_button" href="" target="_blank">Introduction</a></p>

                    </div>
                </div>


        );
    }
}
window.R2MTBR = R2MTBR;