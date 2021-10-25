import React from 'react';

class R2MPlaybook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        let containerClassName = "homeR2M row playbook";

        if(this.props.label){
            containerClassName += " hidden";
        }else if(this.props.module){
            if(this.props.module != 'playbook'){
                containerClassName += " hidden";
            }
        }

        const bannerClassName = "homeBanner";

        let formats = [];

        formats = Object.values(this.props.data).map(function (format) {
           
                return (<Format functions={this.functions} key={format.id} id={format.id} name={format.name} description={format.description} c={format.description} c={format.c} page={format.page} type={format.type} activity={format.activity} icon={format.icon}/>);

        },{
            functions: this.props.functions
        });

        return (

                <div className={containerClassName} >
                    <div className={bannerClassName}>
                        <h1>Playbook</h1>
                        <div className={'_pl40 _pb40'}>
                            A catalog of co-active training formats!<br/>
                            All formats are designed to be short and simple.<br/>Each can be done in 10 minutes.
                        </div>
                        <div className="formatContainer">
                            {formats}
                        </div>
                    </div>

                </div>


        );
    }
}
window.R2MPlaybook = R2MPlaybook;