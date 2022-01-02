import React from 'react';

class R2MProductOwner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_productowner row";

        if(this.props.label != 'product-owner'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Product Owner</h1>
                        <div>
                            Mastering the art of saying "No"<br/>
                        </div>
                    </div>
                </div>


        );
    }
}
window.R2MProductOwner = R2MProductOwner;