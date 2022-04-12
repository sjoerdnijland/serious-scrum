import React from 'react';

class R2MHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        let containerClassName = "homeR2M row home";
        let sponsorClassName = "sponsor";


        if(this.props.label){
            containerClassName += " hidden";
        }else if(this.props.module){
            if(this.props.module != 'home'){
                containerClassName += " hidden";
            }
        }

        const bannerClassName = "homeBanner";

        const sponsorImgSrc = "/images/sponsors.png";

        return (

                <div className={containerClassName}>
                    <div className={bannerClassName}>
                        <h1>Road to Mastery</h1>
                        <div className="title">
                            Master Scrum together.
                            <ul>
                                <li>Go on a learning journey; </li>
                                <li>Share experiences and explore new ways;</li>
                                <li>Expand your playbook with 500+ plays;</li>
                                <li>Guided by accredited trainers and coaches;</li>
                            </ul>
                        </div>
                        <p className="_pt40 _pl40 buttonContainer joinButton _fl"><a className="button" id="requestInvite_button" href="/page/the-road-to-mastery-r2m">About the journey</a></p>
                        <div className="mirozoom">
                            <div>
                                <img src={'/images/zoom.png'}/>
                            </div>
                            <div>
                                <img src={'/images/miro.png'}/>
                            </div>
                            <div>
                                <img src={'/images/slack.png'}/>
                            </div>
                        </div>
                    </div>

                </div>


        );
    }
}
window.R2MHome = R2MHome;