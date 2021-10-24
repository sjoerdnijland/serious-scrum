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

        let baseUrl = '/images/';

        if(this.props.site == 'r2m'){
            baseUrl += 'r2m_';
        }

        let categoryMenuSrc = baseUrl+'menu.png';


        if(this.props.expanded || this.state.hover){
            categoryMenuSrc = baseUrl+'menu_active.png'
        }

        if(this.props.expanded && this.state.hover){
            categoryMenuSrc = baseUrl+'menu.png';
        }

        let containerClassName = "categoryMenuContainer";
        const categoryMenuClassName = "categoryMenu";

        if(this.props.site == 'r2m'){
            containerClassName += ' r2mMenuContainer';
        }

        return (
            <div className={containerClassName}  onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onClick={this.handleClick}>
                <img className={categoryMenuClassName}  src={categoryMenuSrc} />
            </div>
        );
    }
}
window.CategoryMenu = CategoryMenu;