import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import navbarSlyle from './Navbar.module.scss'
import React, { useEffect } from 'react'

// Функция создает класс для активной ссылки

type PropsType = {
    userId: number
}

const Navbar: React.FC<PropsType> = (props) => {

    let [searchParams, setSearchParams] = useSearchParams()
    let isMobile = false
    if(searchParams.size === 1){
        isMobile = true
    }

    return(
    <nav className={isMobile ? navbarSlyle.mobilenav : navbarSlyle.nav}>
        <ul className={navbarSlyle.nav__list}>
            <li className='navbarStyle.nav__list-item'>
                <NavLink to={'/profile/' + props.userId} className={({isActive}) => isActive ? navbarSlyle.active : navbarSlyle.a}>Profile</NavLink>
            </li>
            <li>
                <NavLink to='/dialogs' className={({isActive}) => isActive ? navbarSlyle.active : navbarSlyle.a}>Messages</NavLink>
            </li>
            <li>
                <NavLink to='/users' className={({isActive}) => isActive ? navbarSlyle.active : navbarSlyle.a}>Users</NavLink>
            </li>
            <li>
                <a href='#'>Music</a>
            </li>
            <li>
                <a href='#'>Settings</a>
            </li>
        </ul>
    </nav>
    )
}

export default Navbar