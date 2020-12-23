import React from 'react'

import classname from './AnswerItem.module.scss'
import { useQuizeContext } from '../../containers/Quiz'

export const AnswerItem = ({ answers, state }) => {
  const cls = [classname.AnswerItem]
  if (state) {
    cls.push(classname[state])
  }
  const { onAnswerClickHandler } = useQuizeContext()
  return (
    <li className={cls.join(' ')} onClick={() => onAnswerClickHandler(answers.id)}>
      {answers.text}
    </li>
  )
}
