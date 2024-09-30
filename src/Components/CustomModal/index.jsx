import React from "react";
import { Modal } from "@mui/material";


const CustomModal = ({ isOpen, closeModal, children }) => {

    const handleClose = (e) => {
        const inputClose = e.target.value
        closeModal(inputClose)
    }

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
        >
            {children}
        </Modal>
    )
}

export default CustomModal