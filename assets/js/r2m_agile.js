import React from 'react';

class R2MAgile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_agile row";

        if(this.props.label != 'agile'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Agile 101</h1>
                        <div>
                            Uncovering better ways together!
                        </div>

                    </div>
                </div>


        );
    }
}
window.R2MAgile = R2MAgile;