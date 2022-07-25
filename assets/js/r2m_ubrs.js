import React from 'react';

class R2MUBRS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        let containerClassName = "homeR2M row usps";

        if(this.props.label){
            containerClassName += " hidden";
        }else if(this.props.module){
            if(this.props.module != 'ubrs'){
                containerClassName += " hidden";
            }
        }

        const bannerClassName = "homeBanner";


        return (

            <div className={containerClassName} >
                <div className={bannerClassName}>

                    <div className="uspItem">
                       <a href={"https://www.seriousscrum.com/r2m/#join"} target={"_self"}>
                        <div className="uspIcon">
                            <img src='/images/hike.svg'/>
                        </div>
                        <div className="usp">
                            I want to join a travel group and experience the Road to Mastery myself with certified guides
                        </div>
                       </a>
                    </div>
                    <div className="uspItem">
                        <a href={"https://seriousscrum.com/page/are-you-ready-to-guide-others"} target={"_self"}>
                        <div className="uspIcon">
                            <img src='/images/here.svg'/>
                        </div>
                        <div className="usp">
                            I’m ready to guide my own organization on a Road to Mastery
                        </div>
                        </a>
                    </div>
                    <div className="uspItem">
                        <a href={"https://seriousscrum.com/page/the-r2m-ve--virtual-expedition-license"} target={"_self"}>
                        <div className="uspIcon">
                            <img src='/images/r2mvan.png'/>
                        </div>
                        <div className="usp">
                            I want to use the R2M curriculum for commercial use
                        </div>
                        </a>
                    </div>


                </div>
            </div>


        );
    }
}
window.R2MUBRS = R2MUBRS;