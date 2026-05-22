import { ThemeProvider, CssBaseline } from '@mui/material'
import { getTheme } from './theme/theme'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import useThemeStore from './store/themeStore'
import Layout from './components/Layout'

import Home from './pages/Home'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Favorites from './pages/Favorites'
import OrderHistory from './pages/OrderHistory'
import OrderDetail from './pages/OrderDetail'
import Profile from './pages/Profile'
import Auth from './pages/Auth'

function App() {
  const { mode } = useThemeStore()
  const theme = getTheme(mode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu/:id" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/orders/:id" element={<OrderDetail />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App