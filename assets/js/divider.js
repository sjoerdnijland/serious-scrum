import React from 'react';

class Divider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const ContainerClassName = "divider row";

        return (
            <div className={ContainerClassName}/>
        );
    }
}
window.Divider = Divider;