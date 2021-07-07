import { TaskListType, TaskStatuses, TaskType } from '../../helpers/allTypes'
import { useDispatch } from 'react-redux'
import { setCurrentTaskListId, toggleTaskListMW } from '../../app/appSlice'
import { useAppSelector } from '../../helpers/hooks'
import { removeTask, setTaskStatus, TasksStateType } from '../task/tasksSlice'
import { removeTaskList } from './tasksListsSlice'

type TaskListPrevPropsType = {
  taskList: TaskListType
  tasks: TaskType[]
  removeTaskList: (taskList: TaskListType) => void
  removeTask: (task: TaskType) => void
  setTaskStatus: (task: TaskType, status: TaskStatuses) => void
  showModalWindowTaskList: (taskListId: string) => void
}

const TaskListPrev = (props: TaskListPrevPropsType) => {
  return <div>
    <div>
      <span>{props.taskList.title}</span>
      <button onClick={() => props.removeTaskList(props.taskList)}>x</button>
    </div>
    {props.tasks && props.tasks.map(t => <div key={t.id}>
      <span>{t.title}</span>
      <button onClick={() => props.removeTask(t)}>❌</button>
      <button onClick={() => props.setTaskStatus(t, TaskStatuses.Completed)}>✔</button>
    </div>)}
    <button onClick={() => props.showModalWindowTaskList(props.taskList.id)}>show</button>
  </div>
}

const TasksListsContainer = () => {
  const dispatch = useDispatch()
  const tasks = useAppSelector<TasksStateType>(state => state.tasks)
  const taskLists = useAppSelector<TaskListType[]>(state => state.tasksList)
  const showModalWindowTaskList = (id: string) => {
    dispatch(setCurrentTaskListId({ id }))
    dispatch(toggleTaskListMW({ show: true }))
  }

  const removeTaskListHandler = (taskList: TaskListType) => {
    dispatch(removeTaskList({ taskList }))
  }

  const removeTaskHandler = (task: TaskType) => {
    dispatch(removeTask({ task }))
  }
  const setTaskStatusHandler = (task: TaskType, status: TaskStatuses) => {
    dispatch(setTaskStatus({ task, status }))
  }
  return <>
    {taskLists && taskLists.map((t) => {
      return <TaskListPrev key={t.id}
                           taskList={t}
                           removeTaskList={removeTaskListHandler}
                           removeTask={removeTaskHandler}
                           setTaskStatus={setTaskStatusHandler}
                           tasks={tasks[t.id]}
                           showModalWindowTaskList={showModalWindowTaskList}/>
    })}
  </>
}

export {
  TasksListsContainer
}
