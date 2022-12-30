import React from 'react';
import "../js/r2m_play_blanks_sentenceBox";
import "../js/r2m_play_blanks_answerBox";


class R2MPlayBlanks extends React.Component {
    constructor(props) {
        super(props);

        let config = this.props.config;

        if (config['guide-1'] !== undefined){
            config = this.props.config['guide-1'];
        }
        const text = config['sentence'];
        //const text =  "Scrum is a <lightweight> framework that helps people, teams and organizations generate <value> through <adaptive> solutions for <complex> problems.";
        const textSentence = this.getSentence(text);
        let answers = this.getAnswers(text);

        answers= answers.concat(config['traps']);

        answers = this.shuffleArray(answers);

        this.state = {
            showResults: false,
            question: "",
            answers: answers,
            sentence: textSentence,
            title: config['title']
        }
        this.getSentence = this.getSentence.bind(this);
        this.getAnswers = this.getAnswers.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.test = this.test.bind(this);
        this.shuffleArray = this.shuffleArray.bind(this);
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

    onDrop(e, id){
        const text = e.dataTransfer.getData("text/plain");

        const sentence = this.state.sentence.map(word => {
            if (word.id === id) {
                return { ...word, placed: true, displayed: text };
            }
            return word;
        });

        this.setState({
            sentence: sentence
        });
    }

    test(){
        this.setState({
            showResults: !this.state.showResults,
        });
    }

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return(array);
    }


    render() {

        //console.log(this.state.config['sentence']);

        const showResults = this.state.showResults;

        let containerClassName = "homeR2M row playBlanks";

        if(this.props.label || !this.props.play){
            containerClassName += " hidden";
        }
        if(this.props.play){
            if(this.props.play != 'play_blanks' && this.props.play != 'blanks' ){
                containerClassName += " hidden";
            }
        }



        const bannerClassName = "homeBanner";


        return (

            <div className={containerClassName} >
                <div className={bannerClassName}>
                    <div className={"playBlanksContainer"}>
                        <h1>Fill in the Blanks!</h1>
                        <h2>{this.state.title}</h2>
                        <SentenceBox
                            marked={showResults}
                            onDrop={this.onDrop}
                            sentence={this.state.sentence}
                        />
                        <AnswerBox answers={this.state.answers} />
                        <div>
                            <div className={'primaryButton'} onClick={this.test}>toggle result</div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}
window.R2MPlayBlanks = R2MPlayBlanks;