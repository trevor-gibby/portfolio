import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ContactForm from '@/components/widget_templates/contact-form/contact-form';

import styles from './contact-modal.module.scss';

let showModal;
let hideModal;

const ContactModal = ({messageSent}) => {
  const [show, setShow] = useState(false);

  showModal = () => {
    setShow(true);
  };

  hideModal = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={hideModal} className={styles.modal}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Me</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ContactForm messageSent={messageSent} />
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;
export { showModal, hideModal };
