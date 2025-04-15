import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

import styles from './skills-modal.module.scss';

import skills from '@/variables/skills.json';

let showSkillsModal;
let hideSkillsModal;

const SkillsModal = () => {
  const [show, setShow] = useState(false);

  showSkillsModal = () => {
    setShow(true);
  };

  hideSkillsModal = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={hideSkillsModal} className={styles.skills_modal} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Technical Skills</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={`${styles.skills_modal_content} row`}>
          {skills.map((skill, index) => (
            <div className="col-lg-6">
              <div key={index} className={styles.skill}>
                <h3 className={`h4 ${styles.skill_title}`}>{skill.name}</h3>
                <ul className={styles.skill_list}>
                  {skill.subSkills.map((item, idx) => (
                    item.subSkills ? (
                      <ul className={styles.skill_list} key={idx}>
                          {item.subSkills.map((subItem, subIdx) => (
                            <li className={styles.skill_item} key={subIdx}>{subItem.name}</li>
                          ))}
                      </ul>
                    ) : (
                      <li className={styles.skill_item} key={idx}>{item.name}</li>
                    )
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SkillsModal;
export { showSkillsModal, hideSkillsModal };
