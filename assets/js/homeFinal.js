import React from 'react';

class HomeJoin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        let containerClassName = "homeConference row";


        if(this.props.label){
            containerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

            <div className={containerClassName}>
                <div className={bannerClassName}>
                    <h1>Welcome</h1>
                    <div>
                        Content by and for Scrum Practitioners
                    </div>
                   </div>
            </div>


        );
    }
}
window.HomeJoin = HomeJoin;