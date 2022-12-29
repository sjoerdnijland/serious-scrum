import React from 'react';

class Droppable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bgcolor: "white"
        }
    }

    render() {
        //turn these into functions?
        const _handleDrop = e => {
            this.props.onDrop(e, this.props.groupName);
            this.setState({
                bgcolor: "white",
            });
        };
        //turn these into functions?
        const _handleDragOver = e => {
            e.preventDefault();
            this.setState({
                bgcolor: "yellow",
            });
        };
        //turn these into functions?
        const _handleDragLeave = e => {
            e.preventDefault();
            this.setState({
                bgcolor: "white",
            });
        };

        return (

            <div className={"wordBox"}>
                bgcolor={this.props.bgcolor ? this.props.bgcolor : this.state.bgcolor}
                data-testid={`droppable${this.props.ndx}`}
                onDragLeave={_handleDragLeave}
                onDragOver={_handleDragOver}
                onDrop={_handleDrop}
            >
                {this.state.children}
            </div>

        );
    }
}
window.Droppable = Droppable;
