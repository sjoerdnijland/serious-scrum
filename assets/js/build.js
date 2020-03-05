import React from 'react';

class Build extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const ContainerClassName = "build row";

        return (
            <div className={ContainerClassName}>
                <div className="two-thirds column _pl80">
                    build: 1.4.9 - AGNC - Serious Scrum is a Registered Trademark - KVK: 58970037 - BTW: NL164404363B01- IBAN: NL84 RABO 0130 4761 53
                </div>
                <div className="one-third column right _pr40">
                    :)
                </div>
            </div>

        );
    }
}
window.Build = Build;