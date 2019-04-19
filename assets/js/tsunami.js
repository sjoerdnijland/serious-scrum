import React from 'react';

class Tsunami extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const ContainerClassName = "tsunami row";

        return (
            <div className={ContainerClassName}>
                <h1>a tsunami of sense</h1>
            </div>

        );
    }
}
window.Tsunami = Tsunami;