import React from 'react';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const ContainerClassName = "editor container";

        const pictureSrc = "images/editors/"+this.props.picture+".jpeg";

        const editorUrl = "https://medium.com/"+this.props.handle;

        return (
            <div className={ContainerClassName}>
                <div className="row">
                    <a href={editorUrl} target="_blank"> <img src={pictureSrc}/> </a>
                </div>
                <div className="row">
                    <a href={editorUrl} target="_blank"> {this.props.name} </a>
                </div>
            </div>
        );
    }
}
window.Editor = Editor;