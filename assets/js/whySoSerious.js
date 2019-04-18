import React from 'react';

class WhySoSerious extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        var ContainerClassName = "article container _mt20 _pr60";

        return (
            <div className={ContainerClassName}>
                <div className="row">
                    <h1>Why so serious?!</h1>
                </div>
                <div className="row">
                    <p> We encountered many Scrum practitioners haunted by anti-patterns, myths, misconceptions, outdated notions and ignorant management.
                        Shu-Ha-Ri. With any approach, half-assed play won’t result in premium results.
                    </p>
                    <br/>
                    <p>
                        Serious Scrum is for those who struggle and like to learn how to get it right. It’s a place for those who dare ask for help and are comitted to practise Scrum well.
                        We are professionals who are authentically and positively sharing practical advice and hands-on examples.
                        We enjoy to write about our experiences and read about others in order to grow as Scrum Professionals.
                    </p>
                    <br/>
                    <p className='pBoxDark'>
                        If you wish to publish your awesome Scrum article at Serious Scrum, please share it in the #writing channel in <a href="https://serious-scrum.slack.com/" target="_blank">Serious Scrum Slack</a> and ask for a review.
                    </p>
                </div>
                <div className="row _mt40">
                    <h1>Our team of Writers and Editors</h1>
                </div>
                <div className="row _mt20">
                    <div className="">
                        <Editor name='Willem-Jan Ageling' picture="wj"/>
                    </div>
                    <div className=" ">
                        <Editor name='Sjoerd Nijland' picture="sjoerd"/>
                    </div>
                    <div className=" ">
                        <Editor name='Paddy Corry' picture="paddy"/>
                    </div>
                    <div className="">
                        <Editor name='Maarten Dalmijn' picture="maarten"/>
                    </div>
                    <div className=" ">
                        <Editor name='Adrian Kerry' picture="adrian"/>
                    </div>
                    <div className=" ">
                        <Editor name='John Clopton' picture="john"/>
                    </div>
                    <div className=" ">
                        <Editor name='Justin Bériot' picture="justin"/>
                    </div>
                    <div className="">
                        <Editor name='Marty de Jonge' picture="marty"/>
                    </div>
                    <div className=" ">
                        <Editor name='Max Heiliger' picture="max"/>
                    </div>
                    <div className=" ">
                        <Editor name='Raymon Lagonda' picture="raymond"/>
                    </div>
                    <div className=" ">
                        <Editor name='Scrum Rebel' picture="rebel"/>
                    </div>
                    <div className="">
                        <Editor name='Roland Flemm' picture="roland"/>
                    </div>
                </div>
            </div>
        );
    }
}
window.WhySoSerious = WhySoSerious;