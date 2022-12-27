import React from 'react';

class R2MTravelGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        let containerClassName = "homeR2M row travelgroups";
        let sponsorClassName = "sponsor";

        if(this.props.label){
            containerClassName += " hidden";
        }else if(this.props.module){
            if(this.props.module != 'travelgroups'){
                containerClassName += " hidden";
            }
        }

        const bannerClassName = "homeBanner";

        let travelgroups = [];

        travelgroups = Object.values(this.props.data).map(function (travelgroup) {
            if(travelgroup.isActive) {
                return (<Travelgroup functions={this.functions} key={travelgroup.id} id={travelgroup.id}
                                     groupname={travelgroup.groupname} registration={travelgroup.registration}
                                     launchAt={travelgroup.launch_at} travelerCount={travelgroup.travelerCount}
                                     guides={travelgroup.guides} price_total={travelgroup.price_total}
                                     price_per_month={travelgroup.price_per_month}
                                     isWaitingList={travelgroup.isWaitingList} isSoldOut={travelgroup.isSoldOut}
                                     region={travelgroup.region} isActive={travelgroup.isActive}
                                     registrationLink={travelgroup.registrationLink} host={travelgroup.host}
                                     code={travelgroup.code} duration={travelgroup.duration}
                                     overwriteTravelerCount={travelgroup.overwriteTravelerCount}
                                     interval={travelgroup.interval} sessions={travelgroup.sessions}
                                     description={travelgroup.description}/>);
            }
        },{
            functions: this.props.functions
        });

        return (

                <div className={containerClassName} >
                    <div className={bannerClassName}>
                        <h1>Join a Travel Group:</h1>
                        <div className="travelgroupContainer">
                            {travelgroups}
                        </div>
                    </div>

                </div>


        );
    }
}
window.R2MTravelGroups = R2MTravelGroups;