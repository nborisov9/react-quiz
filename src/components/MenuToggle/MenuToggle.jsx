import React from 'react'

import classes from './MenuToggle.module.scss'

export const MenuToggle = ({ onToggle, isOpen }) => {
  const cls = [classes.MenuToggle, 'fa']

  if (isOpen) {
    cls.push('fa-times')
    cls.push(classes.open)
  } else {
    cls.push('fa-bars')
  }

  return <i onClick={onToggle} className={cls.join(' ')} />
}
