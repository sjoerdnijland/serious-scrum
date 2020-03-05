import React from 'react';

class Handbook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const ContainerClassName = "handbook container _mt40";

        return (
            <div className={ContainerClassName}>
                <div className="row ">
                    <p>Explore The Serious Scrum Handbook</p>

                    <div className="row _mt40">
                        <p>
                            Our handbook is to all those involved in the Serious Scrum community.
                            It covers our purpose, values, ambitions, brand guidelines, how to write for Serious Scrum, legal info, and if and how to approach us for commercial activities and promotions.
                        </p>

                    </div>
                    <p className="_pt20 buttonContainer"><a href="https://medium.com/serious-scrum" target="_blank" className="button">Serious Scrum: Handbook</a></p>
            </div>
            </div>

        );
    }
}
window.Handbook = Handbook;