import { useState } from "react";

export const useOpenFormModal = () => {
    const [openModal, setOpenModal] = useState(false);

    const closeModalHandler = () => setOpenModal(false);
    const openModalHandler = () => setOpenModal(true);

    return {
        openModal,
        openModalHandler,
        closeModalHandler,
    }
}