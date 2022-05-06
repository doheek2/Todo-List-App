import { useState } from 'react'
import { CheckIcon } from '../../assets/svgs'
import styles from './TodoList.module.scss'

/* addCategory */
import AddCategory from '../../components/addCategory/Modal'
import ModalAddSchedule from '../../components/addCategory/Modalsubmit'

const INIT_TODO = [
  {
    id: 1,
    title: '계란 2판 사기',
    done: false,
  },
  {
    id: 2,
    title: '맥북 프로 M1 Max CTO 버전 사기',
    done: false,
  },
  {
    id: 3,
    title: '오늘의 TIL 작성하기',
    done: false,
  },
]

function TodoList() {
  /* addCategory */
  const [modalOpen, setModalOpen] = useState(false)

  function openModal() {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  /* addCategory */

  const [todoList, setTodoList] = useState(INIT_TODO)

  const handleAddClick = (e) => {
    // console.log('handleAddClick')
  }

  const handleChange = (e) => {
    const { dataset, checked } = e.currentTarget
    const { id } = dataset

    setTodoList((prev) => {
      const targetIndex = prev.findIndex((todo) => todo.id === Number(id))
      const newList = [...prev]
      newList[targetIndex].done = checked
      return newList
    })
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.centering}>
        <h1>Hi! this is your assignment.</h1>
        <ul className={styles.tasks}>
          <p className={styles.tasksTitle}>Today&apos;s</p>
          {todoList.map((todo) => (
            <li key={`todo-${todo.id}`} className={styles.task}>
              <div className={styles.checkboxWrapper}>
                <input type='checkbox' checked={todo.done} data-id={todo.id} onChange={handleChange} />
                <CheckIcon />
              </div>
              <p className={styles.title}>{todo.title}</p>
            </li>
          ))}
        </ul>
        <button type='button' className={styles.addButton} onClick={handleAddClick} aria-label='Add button' />

        {/* addCategory */}
        <button type='button' onClick={openModal} aria-label='Add button'>
          버튼
        </button>
        <AddCategory open={modalOpen} close={closeModal}>
          <ModalAddSchedule />
        </AddCategory>
        {/* addCategory */}
      </div>
    </div>
  )
}

export default TodoList
