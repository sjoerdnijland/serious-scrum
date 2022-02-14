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
                <HeaderMenuItem functions={functions} name="Playbook" />
                <HeaderMenuItem functions={functions} name="Testimonials" />
                <HeaderMenuItem functions={functions} name="Travel Groups"/>
                <HeaderMenuItem functions={functions} name="Map"/>
            </div>

        );
    }
}
window.R2MMobileMenu = R2MMobileMenu;