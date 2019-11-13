class Auth {
    constructor(){
        this.authenticated = false
    }
    login(cb){
        this.authenticated = true
        console.log(`Logged IN = ${this.authenticated}`)
        cb()
    }
    logout(cb){
        this.authenticated = false
        cb()
    }
    isAuthenticated(cb){
        console.log(this.authenticated)
        return this.authenticated
    }
}

export default new Auth()