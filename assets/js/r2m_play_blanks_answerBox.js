import React from 'react';
import "../js/r2m_play_blanks_draggable";

class AnswerBox extends React.Component {
    constructor(props) {
        super(props);
        this.onDragStart = this.onDragStart.bind(this);
    }

    onDragStart(e, id) {
        //e.preventDefault();
        if (e.dataTransfer) {
            e.dataTransfer.setData("text/plain", id);
        }
    }

    render() {

        return (

            <div className={"answerBlock"}>
                <div className={"instruction"}>Drag answers below to correct place</div>
                <div className={"mobileInstruction"}>(press for two seconds before dragging)</div>
                <div className={"wordWrapper"}>
                    {this.props.answers.map(a => (
                        <Draggable
                            bgcolor="answer"
                            key={a}
                            name={a}
                            onDragStart={this.onDragStart}
                            onTouchStart={this.onDragStart}
                        />
                    ))}
                </div>

            </div>

        );
    }
}
window.AnswerBox = AnswerBox;
