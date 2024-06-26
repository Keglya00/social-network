import styleProfile from './Profile.module.scss'
import ProfileInfo from './ProfileInfo/ProfileInfo.tsx'
import MyPostsContainer from './MyPosts/MyPostContainer.tsx'
import menuButton from '../../images/menu.png'
import React from 'react'
import { ProfileType } from '../../redux/profileReducer'
import { NavLink } from 'react-router-dom'
import MenuButton from '../Common/MenuButton/MenuButton.tsx'

type PropsType = {
    profile: ProfileType
    isOwner: boolean,
    status: string,
    setUserAboutMe: (aboutMe: string) => void,
    saveAvatar: (avatar: any) => void,
    updateStatus: (status: string) => void,
    onAddChat: () => void
}

const Profile: React.FC<PropsType> = (props) => {
    return(
    <div className={styleProfile.content}>
        <MenuButton />
        <ProfileInfo photos={props.profile.photos} onAddChat={props.onAddChat} setUserAboutMe={props.setUserAboutMe} aboutMe={props.profile.aboutMe} saveAvatar={props.saveAvatar} isOwner={props.isOwner} nickName={props.profile.fullName} status={props.status} updateStatus={props.updateStatus}  />
    </div>
    )
}

export default Profile 