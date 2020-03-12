class Auth {
    constructor(){
        this.authenticated = false
        this.guest = false
    }
    login(cb, props){
        if(props && props.guest){
            this.guest = true
            console.log("guest login")
        }
        this.authenticated = true
        console.log(`Logged IN = ${this.authenticated}`)
        cb()
    }
    logout(cb){
        this.authenticated = false
        cb()
    }
    isAuthenticated(){
        console.log(this.authenticated)
        return this.authenticated
    }
}

export default new Auth()