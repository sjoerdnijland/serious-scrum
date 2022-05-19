import React from 'react';

class Traveler extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        window.open('/page/'+this.props.page, '_blank').focus();
    }

    render() {

        let containerClassName = "traveler";
        let contacted = 'yes';
        let guide = 'no';

        if(!this.props.data.isContacted){
            contacted = 'no';
            containerClassName += " travelerBorder";
        }

        if(this.props.data.isGuide){
            guide = 'yes';
        }

        let travelgroups = [];

        travelgroups = Object.values(this.props.data.travelgroups).map(function (travelgroup) {
           return(<span key={travelgroup.id}>{travelgroup.groupname}</span>);
        });

        return (

            <div className={containerClassName}>
                <h3>
                    {this.props.data.fullname}
                </h3>
                <div>
                    {this.props.data.email}
                </div><br/>
                <div>
                    Guide? <b>{guide}</b>
                </div><br/>
                <div>
                    Contacted? <b>{contacted}</b>
                </div><br/>
                <div>
                    Program: <b>{this.props.data.program}</b>
                </div><br/>
                <div>
                    created: <b>{this.props.data.created.date}</b>
                </div><br/>
                <div>
                    <a href= {this.props.data.link}>LinkedIn</a>
                </div><br/>
                <h4>
                    travelgroups:
                </h4>
                    {travelgroups}
            </div>
        );
    }
}
window.Traveler = Traveler;
