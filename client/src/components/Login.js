import React from 'react'
import auth from './Auth'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

const Login = (props) => {
        const wrongInput = "#ffd4d4"
        let userBgColor = null
        let passwordBgColor = null

        return(
            <div className="Login-container">
                <form id="logIn" className="Login-form">
                    <label htmlFor="uname">Username</label>
                    <input className="Login-input" onSubmit={e => e.preventDefault()} style={{backgroundColor: userBgColor}} type="text" placeholder="Enter Username" name="uname" id="uname" required />

                    <label htmlFor="psw">Password</label>
                    <input className="Login-input" onSubmit={e => e.preventDefault()} style={{backgroundColor: passwordBgColor}} type="password" placeholder="Enter Password" name="psw" id="psw" required />

                    <Button
                        className="Login-button"
                        form="logIn"
                        type="submit"
                        value="submit"
                        onClick={
                            (e) => {
                                e.preventDefault()
                                const username = document.getElementById("uname").value
                                const password = document.getElementById("psw").value
                                console.log(username, password)
                                axios.get(`/api/users/${username}`)
                                    .then(res => {
                                        if(res.data.password && res.data.password === password){
                                            if(res.data.username === "guest"){
                                            // if(username === "guest"){
                                                console.log("LOGGED IN AS GUEST")
                                                auth.login( () => props.history.push('/admin/create'), {guest: true})
                                            }
                                            else{
                                                console.log("LOGGED IN AS ------------------ADMIN")
                                                auth.login( () => props.history.push('/admin/create'), {guest: false})
                                            }
                                        }
                                        else{
                                            if(!res.data.username){
                                                console.log("res.data.username !== username")
                                                userBgColor = wrongInput
                                            }
                                            passwordBgColor = wrongInput
                                            document.getElementById("uname").value = ""
                                            document.getElementById("psw").value = ""
                                        }
                                    })
                            }
                        }
                    >
                        Log In
                    </Button>
                </form>
            </div>
        )
}
export default Login