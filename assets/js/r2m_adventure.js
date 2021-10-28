import React from 'react';

class Adventure extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        window.open(this.props.paymentLink, '_blank').focus();
    }

    render() {

        let containerClassName = "adventure ";

        let id = this.props.id.toString();

        let tentId = id.slice(- 1);

        let tent = "/images/icons/mountain"+tentId+".svg";

        let guides = [];

        guides = Object.values(this.props.guides).map(function (guide) {

            return (<div key={guide}>{guide}</div>);
        },{
            functions: this.props.functions
        });

        let linkClass = "link";

        if(this.props.link == null){
            linkClass = "hidden";
        }


        return (

            <div className={containerClassName}>
                <div className="tent">
                    <img src={tent}/>
                </div>
                <h3>{this.props.name}</h3>
                <div>
                    {this.props.description}
                </div>
                <div className={linkClass}>
                    <a href={this.props.link} target={'_blank'}>learn more</a>
                </div>
                <h4>{this.props.launch_at}</h4>
                <h4>duration {this.props.duration} hours</h4>
                <h4>Guides:</h4>
                <div>
                    {guides}
                </div>
                <h4>€ {this.props.price}</h4>

                <div className={'buttonContainer ticketButton'}>
                    <div onClick={this.handleClick} className={'button'}>Get your ticket</div>
                </div>
            </div>
        );
    }
}
window.Adventure = Adventure;
