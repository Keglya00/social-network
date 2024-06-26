import React from 'react'
import styleLogin from './Login.module.scss'
import { Form, Field } from 'react-final-form'
import { RequiredInput } from '../Common/FormControls/FormComponents.tsx'
import { required } from '../../utilits/validators.ts'
import { connect } from 'react-redux'
import { loginThunkCreator } from '../../redux/authReducer.ts';
import { Navigate } from 'react-router-dom'
import { RootStateType } from '../../redux/redux-store.ts'

type MapStateToPropsType = {
    isAuth: boolean,
    userId: number | null,
    errorMessage: string | null,
    captcha: string | null
}
type MapDispatchToPropsType = {
    loginThunkCreator: (login: string, password: string, rememberMe: boolean, captcha: string) => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

type FormDataType = {
    login: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

const Login: React.FC<PropsType> = (props) => {

    const onSubmit = (formData: FormDataType) => {
        props.loginThunkCreator(formData.login, formData.password, formData.rememberMe, formData.captcha)
    }

    if(props.isAuth) {
        return <Navigate to={'/profile/' + props.userId} />
    }

    return (
        <div className={styleLogin.login__container}>
            <div className={styleLogin.login}>
                <div className={styleLogin.login__inner}>
                    <div className={styleLogin.login__top}>
                        Log In
                    </div>
                    {props.errorMessage ? <div className={styleLogin.errorMessage}>{props.errorMessage}</div> : null }
                    <LoginForm onSubmit={onSubmit} captcha={props.captcha} />
                </div>
            </div>
        </div>
    )
}

type LoginFormPropsType = {
    onSubmit: (formData:  FormDataType) => void,
    captcha: string | null
}

const LoginForm: React.FC<LoginFormPropsType> = (props) => {
    return (
        <Form onSubmit={(formData: FormDataType) => props.onSubmit(formData)}>
            {( { handleSubmit} ) => (
            <form className={styleLogin.login__form} onSubmit={handleSubmit}>
                <div>
                    <div>
                        <Field validate={required} name={'login'} component={RequiredInput} />
                    </div>
                    <div>
                        <Field validate={required} name={'password'} component={RequiredInput}  />
                    </div>
                    <div className={styleLogin.login__rememberMe}>
                        <Field type={'checkbox'} name={'rememberMe'} component={'input'} /> 
                        <div>Remember me</div>
                    </div>
                    <div className={styleLogin.login__captcha}>
                        {props.captcha 
                        ? <div>
                            <img className={styleLogin.login__captcha_img} src={props.captcha} />
                            <div>
                                <Field className={styleLogin.login__captcha_input} validate={required} name={'captcha'} component={'input'} />
                            </div>
                        </div> 
                        : null}
                    </div>
                    <div className={styleLogin.login__button_container}>
                        <button className={styleLogin.login__button}>Log In</button>
                    </div>
                </div>
            </form>
            )}
        </Form>
    )
}

let mapStateToProps = (state: RootStateType) => {
    return {
        isAuth: state.authReducer.isAuth,
        userId: state.authReducer.data ? state.authReducer.data.id : null,
        errorMessage: state.authReducer.errorMessage,
        captcha: state.authReducer.captcha
    }
}

let LoginContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>(mapStateToProps, { loginThunkCreator })(Login)

export default LoginContainer