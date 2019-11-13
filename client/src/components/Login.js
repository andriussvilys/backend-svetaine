import React from 'react'
import auth from './Auth'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

const Login = (props) => {
        const wrongInput = "#ffd4d4"
        let userBgColor = null
        let passwordBgColor = null

        return(
            <div>
                <form id="logIn" style={{display:'flex', flexWrap: 'wrap', width: '300px'}}>
                    <label htmlFor="uname">Username</label>
                    <input onSubmit={e => e.preventDefault()} style={{backgroundColor: userBgColor}} type="text" placeholder="Enter Username" name="uname" id="uname" required />

                    <label htmlFor="psw">Password</label>
                    <input onSubmit={e => e.preventDefault()} style={{backgroundColor: passwordBgColor}} type="password" placeholder="Enter Password" name="psw" id="psw" required />

                    <Button
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
                                        console.log(res.data)
                                        if(res.data.password && res.data.password === password){
                                            auth.login( () => props.history.push('/admin'))
                                        }
                                        else{
                                            if(!res.data.username){
                                                console.log("res.data.username !== username")
                                                userBgColor = wrongInput
                                            }
                                            passwordBgColor = wrongInput
                                            document.getElementById("uname").value = ""
                                            document.getElementById("psw").value = ""
                                            // props.history.push('/admin/login')
                                        }
                                    })
                            }
                        }
                    >
                        Log In
                    </Button>

                    <Button
                        onClick={
                            () => {
                                auth.login( () => {
                                    props.history.push('/admin')
                                })
                            }
                        }
                    type="submit">Force Login
                    </Button>
                </form>
            </div>
        )
}
export default Login