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
                <div className="one-half-fixed column _pl80">
                    build: 1.3.15 - registered to AGNC - KVK: 58970037 - BTW: NL164404363B01- IBAN: NL84 RABO 0130 4761 53
                </div>
                <div className="one-half-fixed column right _pr40">
                    :)
                </div>
            </div>

        );
    }
}
window.Build = Build;