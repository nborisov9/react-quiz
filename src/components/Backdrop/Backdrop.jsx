import React from 'react'

import classes from './Backdrop.module.scss'

export const Backdrop = ({ onClick }) => {
  return <div className={classes.Backdrop} onClick={onClick}></div>
}
