import React from 'react';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        var ContainerClassName = "editor container";

        var pictureSrc = "images/editors/"+this.props.picture+".jpeg";

        return (
            <div className={ContainerClassName}>
                <div className="row">
                    <img src={pictureSrc}/>
                </div>
                <div className="row">
                    {this.props.name}
                </div>
            </div>
        );
    }
}
window.Editor = Editor;