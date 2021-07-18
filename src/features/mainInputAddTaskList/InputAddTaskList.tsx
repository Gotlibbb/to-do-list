import React, { useState } from 'react'
import InputBlock from './InputAddTaskListStyleComponent'

type InputTaskListPropsType = {
  onEnterHandler: (title: string) => void
  taskListCount: number
  setError: (error: string | null) => void
}

const InputAddTaskList = (props: InputTaskListPropsType) => {
  const [localTitle, setLocalTitle] = useState<string>('')
  return <InputBlock taskListCount={props.taskListCount}>
    <input type='text'
           placeholder='Write a new task list... '
           value={localTitle}
           onChange={e => setLocalTitle(e.target.value)}
           onKeyPress={e => {
             if (e.key === 'Enter' && localTitle.length < 99 && localTitle.length >= 1) {
               setLocalTitle('')
               props.onEnterHandler(e.currentTarget.value)
               e.currentTarget.blur()
             } else if (localTitle.length > 99) {
               props.setError('The length of the header exceeds 100, the header must be shorter!')
             }
           }}/>
  </InputBlock>
}

export default React.memo(InputAddTaskList)
