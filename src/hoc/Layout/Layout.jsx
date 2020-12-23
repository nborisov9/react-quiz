import React, { useState } from 'react';

import classes from './Layout.module.scss';
import { MenuToggle } from '../../components';
import { Drawer } from '../../components';

export const Layout = ({ children }) => {
  const [menu, setMenu] = useState(false);
  const toggleMenuHandler = () => {
    setMenu((prevState) => !prevState);
  };

  const menuCloseHandler = () => {
    setMenu(false);
  };

  return (
    <div className={classes.Layout}>
      <MenuToggle onToggle={toggleMenuHandler} isOpen={menu} />
      <Drawer onClose={menuCloseHandler} isOpen={menu} />
      <main>{children}</main>
    </div>
  );
};
