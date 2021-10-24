import React from 'react';

class R2MHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const functions = this.props.functions;

        let ContainerClassName = "r2m_header row";

        const src = "/images/serious-scrum-logo-darkblue-r2m.svg";

        return (
            <div className={ContainerClassName} >
                <a href="/r2m"><div className=" logo">
                    <img src={src}/>
                </div>
                </a>
                <div className="headerOptions _pr10 _pt20">
                    <CategoryMenu functions={functions} expanded={this.props.expanded} site="r2m"/>
                    <JoinButton functions={functions} user={this.props.user}/>
                    <HeaderMenuItem functions={functions} name="Playbook"/>
                    <HeaderMenuItem functions={functions} name="Adventures" />
                    <HeaderMenuItem functions={functions} name="Travel Groups"/>
                    <HeaderMenuItem functions={functions} name="Guides"/>

                </div>
            </div>

        );
    }
}
window.R2MHeader = R2MHeader;