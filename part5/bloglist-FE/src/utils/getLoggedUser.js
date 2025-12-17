export const getLoggedUser = () => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    return loggedUserJson ? JSON.parse(loggedUserJson) : null
}