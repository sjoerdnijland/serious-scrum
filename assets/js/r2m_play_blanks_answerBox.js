import React from 'react';
import "../js/r2m_play_blanks_draggable";

class AnswerBox extends React.Component {
    constructor(props) {
        super(props);
        this.onDragStart = this.onDragStart.bind(this);
    }

    onDragStart(e, id) {
        if (e.dataTransfer) {
            e.dataTransfer.setData("text/plain", id);
        }
    }


    render() {

        return (

            <div className={"block"}>
                Drag answers below to correct place
                <div className={"wordWrapper"}>
                    {this.props.answers.map(a => (
                        <Draggable
                            bgcolor="rgba(255,255,255,0)"
                            key={a}
                            name={a}
                            onDragStart={this.onDragStart}
                        />
                    ))}
                </div>
            </div>

        );
    }
}
window.AnswerBox = AnswerBox;
