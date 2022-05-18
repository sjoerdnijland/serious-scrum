import React from 'react';

class Format extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        window.open('/page/'+this.props.page, '_blank').focus();
    }

    render() {

        let containerClassName = "format ";

        let id = this.props.id.toString();

        let tentId = id.slice(- 1);

        let tent = "/images/icons/"+this.props.icon;

        return (

            <div className={containerClassName}>
                <div className="tent">
                    <img src={tent}/>
                </div>
                <h3>{this.props.name}</h3>
                <div>
                    {this.props.description}
                </div>
                <br/>
                <div className={"label-c"}>{this.props.c}</div>
                <div className={"label-activity"}>{this.props.activity}</div>
                <div className={"label-type"}>{this.props.type}</div>
                <br/> <br/>
                <div className={'buttonContainer formatButton'}>
                    <div onClick={this.handleClick} className={'button'}>Explore</div>
                </div>
            </div>
        );
    }
}
window.Format = Format;
