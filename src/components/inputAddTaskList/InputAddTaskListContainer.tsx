import InputAddTaskList from './InputAddTaskList'
import { toggleTaskListMW } from '../../app/appSlice'
import { useAppDispatch } from '../../helpers/hooks'
import { addTaskList } from '../../features/tasksList/tasksListsSlice'
import { v1 } from 'uuid'

const InputAddTaskListContainer = () => {
  const dispatch = useAppDispatch()

  const onEnterHandler = (title: string) => {
    dispatch(toggleTaskListMW({ show: true }))
    dispatch(addTaskList(
      {
        id: v1(),
        addedDate: 'string',
        order: 123,
        title: title
      }
    ))
  }
  return <InputAddTaskList onEnterHandler={onEnterHandler}/>
}

export {
  InputAddTaskListContainer
}
