import React from 'react'
import classes from './AnswersList.module.scss'
import { AnswerItem } from '../AnswerItem'

export const AnswersList = ({ answers, state }) => {
  return (
    <ul className={classes.AnswersList}>
      {answers.map((answer, index) => (
        <AnswerItem key={index + answer} state={state ? state[answer.id] : null} answers={answer} />
      ))}
    </ul>
  )
}
