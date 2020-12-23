import React from 'react';
import { NavLink } from 'react-router-dom';

import { Backdrop } from '../Backdrop';
import classes from './Drawer.module.scss';

const links = [
  { to: '/', label: 'Список', exact: true },
  { to: '/auth', label: 'Авторизация', exact: false },
  { to: '/quiz-creator', label: 'Создать тест', exact: false },
];

export const Drawer = ({ isOpen, onClose }) => {
  const cls = [classes.Drawer];

  if (!isOpen) {
    cls.push(classes.close);
  }

  return (
    <React.Fragment>
      <nav className={cls.join(' ')}>
        <ul>
          {links.map(({ to, label, exact }, i) => (
            <li onClick={onClose} key={i} className={classes.links}>
              <NavLink to={to} exact={exact} activeClassName={classes.active}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {isOpen && <Backdrop onClick={onClose} />}
    </React.Fragment>
  );
};
