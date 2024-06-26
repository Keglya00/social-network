import './App.scss';
import React, { useEffect } from 'react';
import HeaderContainer from './components/Header/HeaderContainer.tsx';
import NavbarContainer from './components/Navbar/NavbarContainer.tsx';
import ProfileContainer from './components/Profile/ProfileContainer.tsx';
import { BrowserRouter, NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LoginContainer from './components/Login/Login.tsx';
import { initializeApp } from './redux/appReducer.ts';
import { connect } from 'react-redux';
import Preloader from './components/Common/Preloader/Preloader.tsx';
import { RootStateType } from './redux/redux-store.ts';
import { startWsChannel, stopWsChannel } from './redux/dialogsReducer.ts';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.tsx'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer.tsx'))


type MapStateToPropsType = {
  initialized: boolean
}
type MapDispatchToPropsType = {
  initializeApp: () => void
  startWsChannel: () => void
  stopWsChannel: () => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

const App: React.FC<PropsType> = (props) => {

  let catchUnhandledErrors = (e: PromiseRejectionEvent) => {
    console.log('Ops! some error occured. Try to refresh the page')
  }

  useEffect(() => {
    props.initializeApp()
    window.addEventListener('unhandledrejection', catchUnhandledErrors)
    props.startWsChannel()
    return () =>  {
      props.stopWsChannel()
    }
  }, [])

    return (
      <>
      {props.initialized ?
        <BrowserRouter basename='/'>
          <div className='wrapper'>
            <HeaderContainer />
            <div className='container'>
              <NavbarContainer />
              <div className='container__content'>
                <React.Suspense fallback={<Preloader />}>
                  <Routes>
                    <Route path='/profile/:userId' element={ <ProfileContainer /> } />
                    <Route path='/dialogs/' element={ <DialogsContainer /> } />
                    <Route path='/users/*' element={ <UsersContainer/> } />
                    <Route path='/navbar?device=mobile' element={ <NavbarContainer /> } />
                    <Route path='/login/*' element={ <LoginContainer/> } />
                    <Route path='/social-network' element={ <LoginContainer /> } />
                  </Routes>
                </React.Suspense>
              </div>
            </div>
          </div>
        </BrowserRouter> :
        <Preloader />
      }
      </>
    );
  }

let mapStateToProps = (state: RootStateType) => {
  return{
    initialized: state.appReducer.initialized
  }
}

export default connect(mapStateToProps, { initializeApp, startWsChannel, stopWsChannel } )(App);
