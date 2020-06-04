import React from 'react';

class CategoryMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        }

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleMouseOver() {
        this.setState({
            hover: !this.state.hover
        });
    }

    handleMouseOut() {
        this.setState({
            hover: !this.state.hover
        });
    }

    handleClick(){
        this.props.functions.toggleCategoryMenu();
    }

    render() {

        let categoryMenuSrc = '/images/menu.png';

        if(this.props.expanded || this.state.hover){
            categoryMenuSrc = '/images/menu_active.png'
        }

        if(this.props.expanded && this.state.hover){
            categoryMenuSrc = '/images/menu.png';
        }

        const containerClassName = "categoryMenuContainer";
        const categoryMenuClassName = "categoryMenu";

        return (
            <div className={containerClassName}  onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onClick={this.handleClick}>
                <img className={categoryMenuClassName}  src={categoryMenuSrc} />
            </div>
        );
    }
}
window.CategoryMenu = CategoryMenu;