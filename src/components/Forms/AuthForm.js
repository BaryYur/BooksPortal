import React, { useContext, useState } from "react";

import { useForm } from "react-hook-form";

import AuthContext from "../../context/auth-context";

import { Button, Checkbox, FormControlLabel } from "@mui/material";
import "./AuthForm.css";

const AuthForm = () => {
    const authCtx = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [isLogin, setIsLogin] = useState(true);
    const [author, setAuthor] = useState(false);
    const [publisher, setPublisher] = useState(false);

    const switchAuthModeHandler = () => setIsLogin(active => !active);

    const switchAuthorAndPublisher = (e) => {
        if (e.target.value === "on" && author === false) {
            setAuthor(true);
        } else {
            setAuthor(false);
        }

        setPublisher(false);
    }
    const switchPublisherAndAuthor = (e) => {
        if (e.target.value === "on" && publisher === false) {
            setPublisher(true);
        } else {
            setPublisher(false);
        }

        setAuthor(false);
    }

    const submitHandler = (data) => {
        let url;
        let body;

        let userRole = "USER";

        if (author) {
            userRole = "AUTHOR";
        } else if (publisher) {
            userRole = "PUBLISHING";
        }

        if (isLogin) {
            url = "http://localhost:8081/user/login";
            body = {
                email: data.email,
                password: data.password,
            }
        } else {
            url = "http://localhost:8081/user/register";
            body = {
                name: data.firstName,
                email: data.email,
                password: data.password,
                role: userRole,
                basket: [],
                likes: [],
                dislikes: [],
                status: "ACTIVE",
            }
        }

        authCtx.fetchingUser(url, body, isLogin);
    }

    return (
        <div data-testid="auth-form-component" className="login-form-container">
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={handleSubmit(submitHandler)}>
                {!isLogin && <div className="control">
                    <label htmlFor="firstName">
                        {publisher ? <span>Publishing Name</span> : <span>Your Name and Last Name</span>}
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        {...register("firstName", {
                                required: true,
                                minLength: 3,
                                maxLength: 20,
                            }
                        )}
                    />
                    {errors.firstName?.type === "minLength" && <p className="warning-form-p" role="alert">Name is to short</p>}
                    {errors.firstName?.type === "maxLength" && <p className="warning-form-p" role="alert">Name is to long</p>}
                </div>}
                {/*{!isLogin && !publisher && <div className="control">*/}
                {/*    <label htmlFor="lastName">Your Last Name</label>*/}
                {/*    <input*/}
                {/*        id="lastName"*/}
                {/*        type="text"*/}
                {/*        {...register("lastName", {*/}
                {/*                required: true,*/}
                {/*                minLength: 3,*/}
                {/*                maxLength: 20,*/}
                {/*            }*/}
                {/*        )}*/}
                {/*    />*/}
                {/*    {errors.lastName?.type === "minLength" && <p className="warning-form-p" role="alert">Last name is to short</p>}*/}
                {/*    {errors.lastName?.type === "maxLength" && <p className="warning-form-p" role="alert">Last name is to long</p>}*/}
                {/*</div>}*/}
                <div className="control">
                    <label htmlFor="email">Your Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: true,
                            pattern: {
                                    value: /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email"
                                }
                            }
                        )}
                    />
                    {errors.email && <p className="warning-form-p" role="alert">{errors.email.message}</p>}
                </div>
                <div className="control">
                    <label htmlFor="password">Your Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                                required: true,
                                minLength: 3,
                                maxLength: 20
                            }
                        )}
                    />
                    {errors.password?.type === "minLength" && <p className="warning-form-p" role="alert">Password is to short</p>}
                    {errors.password?.type === "maxLength" && <p className="warning-form-p" role="alert">Password is to long</p>}
                </div>
                {!isLogin && <div className="checkbox-control">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={author}
                                onClick={(e) => switchAuthorAndPublisher(e)}
                                {...register("author")}
                            />
                        }
                        label="Are you the author?"
                    />
                </div>}
                {!isLogin && <div className="checkbox-control">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={publisher}
                                onClick={(e) => switchPublisherAndAuthor(e)}
                                {...register("publishing")}
                            />
                        }
                        label="Are you the publisher house?"
                    />
                </div>}
                <div className="login-btns-box">
                    {!authCtx.isLoading && <Button type="submit" variant="contained" style={{ backgroundColor:  "" }} >
                        {isLogin ? "Login" : "Create account"}
                    </Button>}
                    {authCtx.isLoading && <p>Sending request...</p>}
                    <Button
                        type="button"
                        onClick={switchAuthModeHandler}
                        style={{ color: "#318CE7" }}
                    >
                        {isLogin ? "Create new account" : "Login with existing account"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AuthForm;