import React from "react";

const CustomButton = ({  updateClick, btnStyles, btnText }) => {

    const handleClick = (e) => {
        if (updateClick) {
            updateClick(e.target.value);
        }
    }

    return (
        <button onClick={handleClick}  style={btnStyles} > 
            {btnText}  
        </button>
    )
}

export default CustomButton;
