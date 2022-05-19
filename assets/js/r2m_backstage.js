import React from 'react';

class R2MBackstage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        let containerClassName = "homeR2M row backstage";

        if(this.props.label){
            containerClassName += " hidden";
        }else if(this.props.module){
            if(this.props.module != 'backstage'){
                containerClassName += " hidden";
            }
        }
        if(this.props.user.username == ""){
            containerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        let travelers = [];

        travelers = Object.values(this.props.data).map(function (traveler) {
                let travelgroupFilter = false;
                traveler.travelgroups.forEach(travelgroup => {
                    if(travelgroup.id == this.backstageFilters.travelgroup){
                        travelgroupFilter = true;
                    }
                });
                let contacted = "no";

                if(traveler.contacted){
                    contacted = "yes";
                }

                if( (this.backstageFilters.travelgroup == "" || travelgroupFilter) &&
                    (this.backstageFilters.program == "" || this.backstageFilters.program  == traveler.program) &&
                    (this.backstageFilters.contacted == "" || this.backstageFilters.contacted  == contacted))
                {
                    return (<Traveler functions={this.functions} key={"traveler" + traveler.id} data={traveler}/>);
                }
        },{
            functions: this.props.functions,
            backstageFilters: this.props.backstageFilters
        });


        return (

                <div className={containerClassName} >
                    <div className={bannerClassName}>
                        <h1>Backstage</h1>
                        <div className={'_pl40 _pb40'}>
                            Manage travelgroups and waitinglists
                        </div>
                        <BackstageFilters functions={this.props.functions} data={this.props.backstageFilters} travelgroups={this.props.travelgroups}/>
                        <div className="travelerContainer">
                            {travelers}
                        </div>
                    </div>

                </div>
        );
    }
}
window.R2MBackstage = R2MBackstage;