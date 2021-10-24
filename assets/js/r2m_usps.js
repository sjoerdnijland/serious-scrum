import React from 'react';

class R2MUSPS extends React.Component {
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
            if(this.props.module != 'usps'){
                containerClassName += " hidden";
            }
        }

        const bannerClassName = "homeBanner";


        return (

            <div className={containerClassName} >
                <div className={bannerClassName}>
                    <div className="uspItem">
                        <div className="uspIcon">
                            <img src='/images/backpack.svg'/>
                        </div>
                        <div className="usp">
                            Equip your backpack with new tools and techniques to grow as a leader, coach and trainer.
                        </div>
                    </div>
                    <div className="uspItem">
                        <div className="uspIcon">
                            <img src='/images/gear.svg'/>
                        </div>
                        <div className="usp">
                            Safety first! Practice coaching in a psychologically safe environment.
                        </div>
                    </div>
                    <div className="uspItem">
                        <div className="uspIcon">
                            <img src='/images/survival.svg'/>
                        </div>
                        <div className="usp">
                            Don't get lost as a team. Learn to train self-management survival skills.
                        </div>
                    </div>

                    <div className="uspItem">
                        <div className="uspIcon">
                            <img src='/images/boots.svg'/>
                        </div>
                        <div className="usp">
                            It's all co-active. Don't just do the talk. Do the walk. Learn by doing together.
                        </div>
                    </div>


                </div>
            </div>


        );
    }
}
window.R2MUSPS = R2MUSPS;