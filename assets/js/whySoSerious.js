import React from 'react';

class WhySoSerious extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const ContainerClassName = "article container _mt20 _pr60";

        return (
            <div className={ContainerClassName}>
                <div className="row">
                    <h1>Why so serious?!</h1>
                </div>
                <div className="row">
                    <p>
                        Serious Scrum is a place for those who dare ask for help and are committed to practise Scrum well.
                    </p>
                    <br/>
                    <p> We encountered many Scrum practitioners haunted by anti-patterns, myths, misconceptions, outdated notions and ignorant management.
                        Shu-Ha-Ri. With any approach, half-assed play won’t result in premium results.
                    </p>

                </div>
                <div className="row _mt40">
                    <h1>Our team of Writers and Editors</h1>
                </div>
                <div className="row _mt20">
                    <div className="">
                        <Editor name='Willem-Jan Ageling' picture="wj" handle="@WJAgeling"/>
                    </div>
                    <div className=" ">
                        <Editor name='Sjoerd Nijland' picture="sjoerd" handle="@sjoerdnijland"/>
                    </div>
                    <div className=" ">
                        <Editor name='Paddy Corry' picture="paddy" handle="@paddycorry"/>
                    </div>
                    <div className="">
                        <Editor name='Maarten Dalmijn' picture="maarten" handle="@mdalmijn"/>
                    </div>
                    <div className=" ">
                        <Editor name='Adrian Kerry' picture="adrian" handle="@adrian.kerry"/>
                    </div>
                    <div className=" ">
                        <Editor name='John Clopton' picture="john" handle="@jookieSTL"/>
                    </div>
                    <div className=" ">
                        <Editor name='Justin Bériot' picture="justin" handle="@JustinBeriot"/>
                    </div>
                    <div className="">
                        <Editor name='Marty de Jonge' picture="marty" handle="@mdj_22623"/>
                    </div>
                    <div className=" ">
                        <Editor name='Max Heiliger' picture="max" handle="@heiliger.maximilian"/>
                    </div>
                    <div className=" ">
                        <Editor name='Raymon Lagonda' picture="raymond" handle="@raymond.lagonda"/>
                    </div>
                    <div className=" ">
                        <Editor name='Scrum Rebel' picture="rebel" handle="@scrumrebel"/>
                    </div>
                    <div className="">
                        <Editor name='Roland Flemm' picture="roland" handle="@roland.flemm"/>
                    </div>
                </div>
                <p className='pBoxDark _mt25'>
                    To publish your awesome Scrum article at Serious Scrum, please share it in the <b>#writing</b> channel in <a href="https://serious-scrum.slack.com/" target="_blank">Serious Scrum Slack</a> and ask for a review.
                </p>
            </div>
        );
    }
}
window.WhySoSerious = WhySoSerious;