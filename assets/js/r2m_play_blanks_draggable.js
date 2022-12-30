import React from 'react';

class Draggable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bgcolor: "white"
        }
        this.handleDragStart = this.handleDragStart.bind(this);
    }

    handleDragStart(e) {
        this.props.onDragStart(e, this.props.name);
    }

    render() {

        return (

            <div className={"wordBox answer"}
                 bgcolor={this.props.bgcolor}
                 data-testid="answer"
                 draggable="true"
                 onDragStart={this.handleDragStart}
                 onTouchStart={this.handleDragStart}
            >
                {this.props.name}
            </div>

        );
    }
}
window.Draggable = Draggable;
