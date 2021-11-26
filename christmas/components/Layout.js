import Footer from './Footer'
import Navigation from './Navigation'

const Layout = ({ children }) => (
  <>
    <Navigation />
    <main>{children}</main>
    <Footer />
  </>
)

export default Layout
