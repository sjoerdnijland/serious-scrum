import React from 'react';

class Build extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        var ContainerClassName = "build row";

        return (
            <div className={ContainerClassName}>
                <div className="_ml40">
                    build: 1.0.0
                </div>
            </div>

        );
    }
}
window.Build = Build;