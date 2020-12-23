import React from 'react';

import classes from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={classes.center}>
      <div className={classes.Loader}>
        <div />
        <div />
      </div>
    </div>
  );
};
