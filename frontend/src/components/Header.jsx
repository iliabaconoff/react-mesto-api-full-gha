import { NavLink } from 'react-router-dom';

function Header ({ isLoggedIn, email, onSignOut }) {
  return (
    <header className="header">
      <div className="header__logo" />
      <div className='header__wrapper'>
        {
          isLoggedIn
            ?
              <>
                <p className='header__email'>{email}</p>
                <button type='button' className='header__button' onClick={onSignOut}>Выйти</button>
              </>
            :
              <>
                <NavLink
                  to="/sign-in"
                  className={({isActive}) => `${!isActive ? 'header__link header__link_active' : 'header__link'}`}>
                    Войти
                </NavLink>
                <NavLink
                  to="/sign-up"
                  className={({isActive}) => `${!isActive ? 'header__link header__link_active' : 'header__link'}`}>
                    Регистрация
                </NavLink>
              </>
        }
        
      </div>
    </header>
  )
}

export default Header;