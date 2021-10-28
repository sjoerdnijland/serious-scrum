import React from 'react';

class R2MAdventures extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        let containerClassName = "homeR2M row adventures";

        if(this.props.label){
            containerClassName += " hidden";
        }else if(this.props.module){
            if(this.props.module != 'adventures'){
                containerClassName += " hidden";
            }
        }

        const bannerClassName = "homeBanner";

        let adventures = [];

        adventures = Object.values(this.props.data).map(function (adventure) {
            if(adventure.isActive){
                return (<Adventure functions={this.functions} key={adventure.id} id={adventure.id} name={adventure.name} description={adventure.description} price={adventure.price} link={adventure.link} paymentLink={adventure.paymentLink} launch_at={adventure.launch_at}  duration={adventure.duration} guides={adventure.guides} />);
            }
        },{
            functions: this.props.functions
        });

        return (

                <div className={containerClassName} >
                    <div className={bannerClassName}>
                        <h1>Adventures</h1>
                        <div className={'_pl40 _pb40'}>
                            Get your ticket for a stand-alone training!<br/>
                        </div>
                        <div className="adventureContainer">
                            {adventures}
                        </div>
                    </div>

                </div>


        );
    }
}
window.R2MAdventures = R2MAdventures;