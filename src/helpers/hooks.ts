import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppRootStateType } from '../store'
import { useEffect } from 'react'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const useKeyHandler = (onKey: () => void, key: string) => {
  useEffect(() => {
    const handleKey = (e : any) => (e.key === key) && onKey()
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [])
}
