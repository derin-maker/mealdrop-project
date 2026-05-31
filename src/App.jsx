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
import Payment from './pages/Payment'
import Landing from './pages/Landing'

function App() {
  const { mode } = useThemeStore()
  const theme = getTheme(mode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/menu/:id" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/orders/:id" element={<OrderDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/landing" element={<Landing />} />

              </Routes>
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
