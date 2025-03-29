import styles from './contact-form.module.scss';

import { Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';

export default function ContactForm({ messageSent }) {

  const [honeyPot, setHoneyPot] = useState(''); // Honey pot field to prevent spam
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(messageSent ? 'Thank you for your submission! I will get back to you as soon as possible' : '');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();

    const formData = {
      honeyPot,
      name,
      email,
      message
    };

    try {
      const result = await axios.post('/api/contact', formData);
      // Handle successful submission
      if(!result.data) {
        setErrorMessage('There was an error submitting your form. Please try again later or reach out to my email directly.');
        setIsSubmitting(false);
        return;
      }
      if(result.data.error) {
        setErrorMessage(result.data.error);
        setIsSubmitting(false);
        return;
      }

      if(result.data.message) {
        setSuccessMessage(result.data.message);
        setIsSubmitting(false);
        return;
      }

      setSuccessMessage('Thank you for your submission! I will get back to you as soon as possible');
      setIsSubmitting(false);
    } catch (error) {
      // Handle error
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contact_form}>
      {successMessage ? (
        <p className={styles.success_message}>{successMessage}</p>
      ) : (
        <div>
          {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}
          {isSubmitting && <div className={styles.submitting_spinner}></div>}
          <p>
            Feel free to reach out to me at{' '}
            <a target="_blank" rel="nofollow" href='mailto:trevor.gibby@gmail.com'>trevor.gibby@gmail.com</a>{' '}
            or by filling out the form below.
          </p>
          <Form onSubmit={handleSubmit} disabled={isSubmitting} className={isSubmitting ? styles.submitting_overlay : ''}>
            <Form.Control type='hidden' value={honeyPot} onChange={(e) => setHoneyPot(e.target.value)} />
            <div className="row">
              <Form.Group className={`${styles.form_group} col-12`} controlId='name'>
                <Form.Label className={styles.form_label}>Name</Form.Label>
                <Form.Control
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.form_control}
                  required
                />
              </Form.Group>
              <Form.Group className={`${styles.form_group} col-12`} controlId='email'>
                <Form.Label className={styles.form_label}>Email</Form.Label>
                <Form.Control
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.form_control}
                  required
                />
              </Form.Group>
              <Form.Group className={`${styles.form_group} col-12`} controlId='message'>
                <Form.Label className={styles.form_label}>Message</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={styles.form_control}
                  required
                />
              </Form.Group>
              <Form.Group className={`${styles.form_group} col-12`} controlId='submit'>
                <Button className="btn-block" variant='primary' type='submit'>
                  Submit
                </Button>
              </Form.Group>
            </div>
          </Form>
        </div>
      )}
    </div>
  )
}