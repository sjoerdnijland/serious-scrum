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
                    <HeaderMenuItem functions={functions} name="Playbook" target="/playbook"/>
                    <HeaderMenuItem functions={functions} name="Testimonials" target="/testimonials"/>
                    <HeaderMenuItem functions={functions} name="Travelgroups" target="/travelgroups"/>
                    <HeaderMenuItem functions={functions} name="Guides" target="/guides"/>
                    <HeaderMenuItem functions={functions} name="The Journey" target="page/the-journey"/>
                    <HeaderMenuItem functions={functions} name="Map" target="r2m/map"/>

                </div>
            </div>

        );
    }
}
window.R2MHeader = R2MHeader;