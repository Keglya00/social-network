import { connect } from "react-redux";
import Header from "./Header";
import React from "react";
import { setUsersAvatarThunkCreator, logoutThunkCreator } from './../../redux/authReducer';


class HeaderApiComponent extends React.PureComponent {

    componentDidMount(){
        this.userAuthorased()       
    }

    componentDidUpdate(prevProps) {
        if(this.props.profile != prevProps.profile){
            this.userAuthorased()
        }        
    }

    userAuthorased = () => {
        this.props.setUsersAvatarThunkCreator(this.props.userAuthData.id)
    }

    render() {
        return (
            <>
                <Header logout={this.props.logoutThunkCreator} login={this.props.userAuthData.login} userAvatar={this.props.userAvatar} isAuth={this.props.isAuth} userAuthorised={this.userAuthorased} /> 
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        userAuthData: state.authReducer.data,
        userAvatar: state.authReducer.userAvatar,
        isAuth: state.authReducer.isAuth,
        isFetching: state.authReducer.isFetching,
        profile: state.profileReducer.profile
    }
}

const HeaderContainer = connect(mapStateToProps, { setUsersAvatarThunkCreator, logoutThunkCreator})(HeaderApiComponent)

export default HeaderContainer