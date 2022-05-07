import moment from 'moment'

const MAIN_STORAGE_KEY = 'todo'

export const getAllData = () => {
  const allData = localStorage.getItem(MAIN_STORAGE_KEY)
  return JSON.parse(allData)
}

export const updateAllData = (allData) => {
  try {
    localStorage.setItem(MAIN_STORAGE_KEY, JSON.stringify(allData))
  } catch (err) {
    console.log(err)
  }
}

export const getUserByNickName = (nickName) => {
  const allData = localStorage.getItem(MAIN_STORAGE_KEY)
  return JSON.parse(allData).filter((val) => val.userNickName === nickName)[0]
}
export const getUserByUserId = (userId) => {
  const allData = localStorage.getItem(MAIN_STORAGE_KEY)
  return JSON.parse(allData).filter((val) => val.id === userId)[0]
}

export const getCategoryByNickNameAndCategoryId = (nickName, categoryId) => {
  const user = getUserByNickName(nickName)
  return user.data.category.filter((val) => val.id === categoryId)[0]
}

export const getPastTodosByNickName = (nickName) => {
  const userData = getUserByNickName(nickName)
  const today = moment().format('YYYY/MM/DD')
  return userData.data.todoList.filter((todo) => moment(todo.date).isBefore(today) && !todo.isDone)
}

export const updatePastTodos = (nickName, pastTodos, deleteTodos) => {
  const userData = getUserByNickName(nickName)
  pastTodos.forEach((pastTodo) => {
    const index = userData.data.todoList.findIndex((todo) => todo.id === pastTodo.id)
    userData.data.todoList.splice(index, 1)
  })
  deleteTodos.forEach((deleteTodo) => {
    const index = pastTodos.findIndex((pastTodo) => pastTodo.id === deleteTodo.id)
    pastTodos.splice(index, 1)
  })
  pastTodos.forEach((pastTodo) => {pastTodo.date = moment().format('YYYY/MM/DD')})
  userData.data.todoList.push(...pastTodos)
  const allData = getAllData()
  allData.forEach((user) => {
    if(user.userNickName === nickName) {
      user.data.todoList = userData.data.todoList
    }
  })
  updateAllData(allData)
}

export const editCategory = (nickName, category) => {
  const allData = getAllData()
  const userData =  getUserByNickName(nickName)
  userData.data.category.forEach((value) => {
    if(value.id === category.id) {
      value.categoryName = category.newCategoryName
      value.color = category.newColor
    }
  })
  allData.forEach((user) => {
   if(user.userNickName === nickName) {
      user.data = userData.data
    }
  })
  updateAllData(allData)
}

export const removeCategory = (nickName, categoryId) => {
  const allData = getAllData()
  const userData = getUserByNickName(nickName)
  // remove category
  const categoryIndex = userData.data.category.findIndex((value) => value.id === categoryId)
  userData.data.category.splice(categoryIndex, 1)
  allData.forEach((user) => {
    if(user.userNickName === nickName) {
       user.data = userData.data
     }
  })
  // remove todos
  const willDeleteTodoList = userData.data.todoList.filter((todo) => todo.categoryId === categoryId)
  willDeleteTodoList.forEach((willDeleteTodo) => {
    const willDeleteTodoIndex = userData.data.todoList.findIndex((todo) => todo.id === willDeleteTodo.id)
    userData.data.todoList.splice(willDeleteTodoIndex, 1)
  })
  updateAllData(allData)
}