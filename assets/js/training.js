import React from 'react';

class Training extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const ContainerClassName = "container _mt40";

        return (
            <div className="training _pt10">
                <div className={ContainerClassName}>
                    <div className="row center _mb40">
                        <h1>Road To Mastery Online Training</h1>

                        <div className="row _mt40">
                            <p>
                                Our program is a mix of online group and individual coaching, peer-review, field practice and assessment. It is a continuous interactive training. You will join and grow a network of other Serious Scrum Masters who will continue to support each other in the field.</p>
                        </div>
                        <p className="_pt20 buttonContainer center"><a href="/docs/Serious-Scrum-Road-To-Mastery-Training.pdf" target="_blank" className="button">Download PDF</a></p>
                    </div>
                </div>
            </div>

        );
    }
}
window.Training = Training;