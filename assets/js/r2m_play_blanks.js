import React from 'react';
import "../js/r2m_play_blanks_sentenceBox";

class R2MPlayBlanks extends React.Component {
    constructor(props) {
        super(props);

        const text = "The <pink> and <blue> fox <jumped> over the <dog>";
        const textSentence = this.getSentence(text);
        const answers = this.getAnswers(text);

        this.state = {
            showResults: false,
            question: "",
            answers: answers,
            sentence: textSentence
        }
        this.getSentence = this.getSentence.bind(this);
        this.getAnswers = this.getAnswers.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.test = this.test.bind(this);
    }

    getSentence(text){
        const textSentence = text.split(" ").map((w, id) => {
            if (w.startsWith("<")) {
                const m = w.match(/[a-z-A-Z]+/);
                return { id, text: m[0], type: "answer", placed: false, displayed: "" };
            }
            return { id, text: w, type: "word" };
        });
        return(textSentence);
    }

    getAnswers(text){
        const wordList = Array.from(new Set(text.split(" ")));
        return wordList.reduce((acc, cur) => {
            if (cur.startsWith("<")) {
                const m = cur.match(/[a-z-A-Z]+/);
                return acc.concat(m[0]);
            }
            return acc;
        }, []);
    }

    onDrop(e){
        const text = e.dataTransfer.getData("text/plain");

        const sentence = this.state.sentence.map(word => {
            if (word.id === dropId) {
                return { ...word, placed: true, displayed: text };
            }
            return word;
        });
        this.setState({
            sentence: sentence,
        });
    }

    test(){
        this.setState({
            showResults: !state.showResults,
        });
    }

    render() {

        const showResults = this.state.showResults;



        let containerClassName = "homeR2M row travelgroups";

        if(this.props.label || !this.props.module){
            containerClassName += " hidden";
        }
        if(this.props.module){
            if(this.props.module != 'play_blanks'){
                containerClassName += " hidden";
            }
        }

        const bannerClassName = "homeBanner";

        return (

            <div className={containerClassName} >
                <div className={bannerClassName}>
                    <h1 >Fill in the Blanks!</h1>
                    <SentenceBox
                        marked={showResults}
                        onDrop={this.onDrop}
                        sentence={this.state.sentence}
                    />
                </div>
            </div>


        );
    }
}
window.R2MPlayBlanks = R2MPlayBlanks;