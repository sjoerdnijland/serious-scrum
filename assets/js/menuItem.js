import React from 'react';

class MenuItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        }

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.setActive = this.setActive.bind(this);
    }

    handleMouseOver() {
        if(this.props.type=='category') {
            return;
        }
        this.setState({
            hover: !this.state.hover
        });
    }

    handleMouseOut() {
        if(this.props.type=='category') {
            return;
        }
        this.setState({
            hover: !this.state.hover
        });
    }

    setActive(){
        if(this.props.type=='category') {
            return;
        }
        this.props.functions.setActive(this.props.id);
    }

    render() {

        //active
        let menuItemClassName = "menuItem";
        let bulletSrc = "/images/bullet-white.png";
        let active = false;

        if(this.props.active && !this.props.category){
            active = true;
        }


        if((active || this.state.hover) && this.props.type!="editorial" && this.props.type!="search"){
            bulletSrc = "/images/bullet-blue.png";
            menuItemClassName += " active";
        }

        if(this.props.type=="editorial" || this.props.type=="search"){
            menuItemClassName += " editorial _fr";
            if(active){
                menuItemClassName += " highlight";
            }
        }

        if(this.props.type=="category"){
            menuItemClassName += " category";
        }

        if(this.props.type=="category" && !this.props.category || this.props.hide || (!this.props.filter && this.props.id == 'search')){
            menuItemClassName += " hidden";
        }

        return (
            <div className={menuItemClassName}  onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onClick={this.setActive}>
                <img src={bulletSrc}/> {this.props.filter}
            </div>
        );
    }
}
window.MenuItem = MenuItem;