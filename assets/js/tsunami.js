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
            <a href="https://medium.com/serious-scrum/serious-scrums-mission-and-hokusai-s-wave-86bb7f32267d" target="_blank">
                <div className={ContainerClassName}>
                    <h1>a tsunami of sense</h1>
                </div>
            </a>

        );
    }
}
window.Tsunami = Tsunami;