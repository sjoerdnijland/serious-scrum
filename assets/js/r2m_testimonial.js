import React from 'react';

class Testimonial extends React.Component {

    render() {

        const icon = '/images/icons/'+this.props.icon;

        return (
            <div className="testimonialItem">
                <div className="testimonial">
                    "{this.props.testimonial}"<span className='name'> - {this.props.name}</span>
                </div>
                <div className="testimonialIcon">
                    <img src={icon}/>
                </div>
            </div>
        );
    }
}
window.Testimonial = Testimonial;
