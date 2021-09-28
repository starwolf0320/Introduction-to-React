
function login() {
    // send api - email, password
    // api response will be some token
    const token = "1234"
    console.log("Logging in...")
    const user = {
        email: "test@test.com",
        token: token,
        userId: 1
    }
    localStorage.setItem('user', JSON.stringify(user))
    return user
}

function logout() {
    console.log("Logging out...")
    localStorage.removeItem('user')
}

function isLoggedIn() {
    const user = localStorage.getItem('user')
    return user !== null
}

function getUser() {
    return localStorage.getItem('user')
}

const authService = {
    login,
    logout,
    isLoggedIn,
    getUser
}

export default authService