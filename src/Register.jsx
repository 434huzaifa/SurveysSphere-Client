import { updateProfile } from "firebase/auth";
import { Button, Label, TextInput, Card } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from "./useAuth";
const Register = () => {
    const { signUpUser, userData } = useAuth()
    const navigate = useNavigate()
    function GetUserAndCreate(e) {
        e.preventDefault();
        let error = document.getElementById("error")
        error.textContent = ""
        let name = e.target.name.value;
        let email = e.target.email.value;
        let image = e.target.image.value;
        let password1 = e.target.password1.value;
        let password2 = e.target.password2.value;

        if (password1 == password2) {
            if (toString(password1).length >= 6) {
                if (/[A-Z]/.test(password1)) {
                    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password1)) {
                        userData({ name: name, email: email,image:image  }).then(() => {
                            signUpUser(email, password1)
                                .then(res => {
                                    updateProfile(res.user, {
                                        displayName: name,
                                        photoURL: image
                                    }).then(() => {
                                        Swal.fire({ icon: 'success', title: "Account Successfully Created" }
                                        ).then(() => {
                                            navigate('/')
                                        })
                                    }).catch(err => {
                                        error.textContent = err.message
                                    })
                                }
                                )
                                .catch(err => {
                                    error.textContent = err.message
                                })
                        }).catch(err=>{
                            error.textContent=err.response.data
                        })

                    } else {
                        error.textContent = "Password don't have a special character"
                    }
                } else {
                    error.textContent = "Password don't have a capital letter"
                }
            } else {
                error.textContent = 'Password Less than 6 characters'
            }
        } else {
            error.textContent = 'Password Did Not Match'

        }

    }
    return (
        <div className="my-4">
            <Card >
                <div className="flex justify-center items-center">
                    <div className="flex-1">
                        <img src="/register.jpg" alt="" />
                    </div>
                    <div className="flex-1">
                        <form className="flex flex-col gap-4" onSubmit={GetUserAndCreate}>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Your Name" />
                                </div>
                                <TextInput id="name" name="name" type="text" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Your email" />
                                </div>
                                <TextInput id="email" type="email" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password1" value="Your password" />
                                </div>
                                <TextInput id="password1" type="password" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password2" value="Confirm Password" />
                                </div>
                                <TextInput id="password2" type="password" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="image" value="Image url" />
                                </div>
                                <TextInput id="image" name='image' type="url" required />
                            </div>
                            <p id='error' className='text-red-500 font-semibold '></p>
                            <Button type="submit">Sign Up</Button>
                        </form>
                        <p>If you have a account please, <Link to="/login" className='underline text-cyan-500'>Login</Link></p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Register;