import React from 'react';

class Travelgroup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let containerClassName = "travelgroup ";

        let joinVisible = false;
        if(this.props.registration == 'open'){
            joinVisible = true;
        }

        let id = this.props.id.toString();

        let tentId = id.slice(- 1);

        let tent = "/images/icons/tent"+tentId+".png";

        let guides = [];

        guides = Object.values(this.props.guides).map(function (guide) {

            return (<div key={guide}>{guide}</div>);
        },{
            functions: this.props.functions
        });

        return (

            <div className={containerClassName}>
                <div className="tent">
                    <img src={tent}/>
                </div>
                <h3>{this.props.groupname}</h3>
                <div>
                    {this.props.launchAt}
                </div>
                <div>
                    Price per month: € {this.props.price_per_month},-
                </div>
                <h4>Guides:</h4>
                <div>
                    {guides}
                </div>
                <h4>Travelers: {this.props.travelerCount}</h4>
                <JoinButton functions={this.props.functions} user={this.props.user} visible={joinVisible} travelgroup={id}/>
            </div>
        );
    }
}
window.Travelgroup = Travelgroup;
