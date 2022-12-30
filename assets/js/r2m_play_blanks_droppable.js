import React from 'react';

class Droppable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bgcolor: "white"
        }
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
    }

    handleDrop(e) {
        e.preventDefault();
        this.props.onDrop(e, this.props.groupName);
        this.setState({
            bgcolor: "white"
        });
    }

    handleDragOver(e) {
        e.preventDefault();
        this.setState({
            bgcolor: "yellow",
        });
    }
    handleDragLeave(e) {
        e.preventDefault();
        this.setState({
            bgcolor: "white",
        });
    }

    render() {

        const bgcolor = this.props.bgcolor ? this.props.bgcolor : this.state.bgcolor;

        let wordBoxClassName = "wordBox " + bgcolor;

        return (

            <div className={wordBoxClassName}
                 bgcolor={bgcolor}
                 data-testid={`droppable${this.props.ndx}`}
                 onDragLeave={this.handleDragLeave}
                 onDragOver={this.handleDragOver}
                 onDrop={this.handleDrop}
                 onTouchEnd={this.handleDragLeave}
            >
                {this.props.children}
            </div>

        );
    }
}
window.Droppable = Droppable;
