import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const BlogLayout = ({ children }) => {
  const { logIn, isAuthenticated, logOut, currentUser } = useAuth()
  return (
    <>
      <header>
        <h1>
          <Link to={routes.home()}>Redwood Blog</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to={routes.about()}>About</Link>
            </li>
            <li>
              <Link to={routes.contact()}>Contact Us</Link>
            </li>
            <li>
              <a href="#" onClick={isAuthenticated ? logOut : logIn}>
                {isAuthenticated ? 'Log Out' : 'Log In'}
              </a>
            </li>
          </ul>
        </nav>
        {isAuthenticated && (<li>Currently logged in as {currentUser.email}</li>)}
      </header>
      <main>{children}</main>
    </>
  )
}

export default BlogLayout
