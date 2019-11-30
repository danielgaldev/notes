import React from 'react';
import useAxios from 'axios-hooks';
import { Link } from 'react-router-dom';
import { Card, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { history } from '../App';

import s from './SemesterListItem.module.css';

const CustomToggle = React.forwardRef(({ onClick }, ref) => (
  <Button ref={ref} variant="light" className={s['button']} onClick={onClick}><FontAwesomeIcon icon='ellipsis-v' /></Button>
));

export default function SemesterListItem({ semester, update }) {
  function validateStatus(status) {
    if (status >= 200 && status < 300) {
      update();
      return true;
    } else {
      return false;
    }
  }

  const [, execute] = useAxios({
    url: `/api/v1/semesters/${semester.id}/`,
    method: 'DELETE',
    validateStatus
  }, { manual: true });

  return (
    // <Card className={s['card']} onClick={() => history.push(`/semesters/${semester.id}`)}>
    <Card className={s['card']}>
      <Card.Title onClick={() => history.push(`/semesters/${semester.id}`)} className={s['title']}>{semester.number}. semester</Card.Title>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />

        <Dropdown.Menu>
          <Dropdown.Item>Red</Dropdown.Item>
          <Dropdown.Item>Blue</Dropdown.Item>
          <Dropdown.Item>Orange</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Card>
    // <li>
    //   <Link to={`/semesters/${semester.id}`}>{semester.number}. semester</Link>
    //   <button onClick={execute}>Delete</button>
    // </li>
  );
}
