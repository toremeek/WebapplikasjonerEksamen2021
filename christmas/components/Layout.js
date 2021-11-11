const { default: Navigation } = require('./Navigation')

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  )
}

export default Layout
