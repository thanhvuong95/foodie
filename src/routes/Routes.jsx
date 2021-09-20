import React from 'react'
import {Switch, Route} from 'react-router-dom'
import ScrollTop from '../components/ButtonScroll/ScrollTop'

const Home = React.lazy(() => import('../features/Home/index'))
const Login = React.lazy(() => import('../features/Login/Login'))
const Header = React.lazy(() => import('../components/Header/Header'))
const Footer = React.lazy(() => import('../components/Footer/Footer'))
const Order = React.lazy(() => import('../features/Order/index'))
const Checkout = React.lazy(() => import('../features/Checkout/index'))
const NotFound = React.lazy(() => import('../components/NotFound/NotFound'))


const Routes = () => {
    return (
            <Switch>
                    <Route path = '/login'  component = {LoginPage} />                
                    <Route component = {DefaultPage} />
            </Switch>
       
    )
}

const DefaultPage = () => {

    return (
        <>
            <Header/>
            <main className = 'main'>
                <Switch>
                    <Route path = '/' exact component = {Home} />
                    <Route path = '/product' exact component = {Order} />
                    <Route path = '/checkout' exact component = {Checkout} />
                    <Route path = '*' component = {NotFound} />
                </Switch>
            </main>
            <Footer />
            <ScrollTop />
        </>
    )
}

const LoginPage = () => {
    return (
        <Route path ="/login" component = {Login} />
    )
}

// const PrivateRoute = ({ component: Component,...rest }) => {
//     const user = useSelector(selectUser)
//     console.log('route:', user);
//     return <Route {...rest} render={(props) => (
//             user 
//             ? <Component {...props} />
//             : <Redirect to='/login' />
//         )} 
//     />
// }
export default Routes
