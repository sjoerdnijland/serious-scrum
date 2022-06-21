import React from 'react';

class R2MGuides extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        let containerClassName = "homeR2M row guides";

        if(this.props.label || !this.props.module){
            containerClassName += " hidden";
        }
        if(this.props.module){
            if(this.props.module != 'guides'){
                containerClassName += " hidden";
            }
        }

        const bannerClassName = "homeBanner";

        let guides = [];

        guides = Object.values(this.props.guides).map(function (guide) {

            return (<GuideItem key={guide.id} fullname={guide.fullname} link={guide.link} />);
        },{
            functions: this.props.functions
        });

        return (

            <div className={containerClassName} >
                <div className={bannerClassName}>
                    <h1>R2M Guides</h1>
                    <div>
                        Our R2M trainers are happy to guide you!
                        <br/> <br/>
                        <div className="guideList">
                            {guides}
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}
window.R2MGuides = R2MGuides;