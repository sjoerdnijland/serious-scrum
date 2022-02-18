import React from 'react';

class R2MMobileMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const functions = this.props.functions;

        let ContainerClassName = "r2m_mobileMenu row";

        return (
            <div className={ContainerClassName} >
                <HeaderMenuItem functions={functions} name="Playbook" target="r2m/playbook" />
                <HeaderMenuItem functions={functions} name="Testimonials" target="r2m/testimonials" />
                <HeaderMenuItem functions={functions} name="Travelgroups" target="r2m/travelgroups" />
                <HeaderMenuItem functions={functions} name="Journey" target="page/the-journey" />
            </div>

        );
    }
}
window.R2MMobileMenu = R2MMobileMenu;