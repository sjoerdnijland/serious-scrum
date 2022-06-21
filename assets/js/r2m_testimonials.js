import React from 'react';

class R2MTestimonials extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        let containerClassName = "homeR2M row testimonials";

        if(this.props.label || !this.props.module){
            containerClassName += " hidden";
        }
        if(this.props.module){
            if(this.props.module != 'testimonials'){
                containerClassName += " hidden";
            }
        }

        const bannerClassName = "homeBanner";

        let testimonials = [];

        testimonials = Object.values(this.props.data).map(function (testimonial) {
            return (<Testimonial functions={this.functions} key={testimonial.id} id={testimonial.id} testimonial={testimonial.testimonial} name={testimonial.name} icon={testimonial.icon} />);
        },{
            functions: this.props.functions
        });


        return (

            <div className={containerClassName} >
                <div className={bannerClassName}>
                    {testimonials}
                </div>
            </div>


        );
    }
}
window.R2MTestimonials = R2MTestimonials;