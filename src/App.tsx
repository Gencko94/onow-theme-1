import './styles/transitions.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from 'react-query';
import ScrollToTopOnMount from './utils/ScrollToTopOnMount';
import { Suspense } from 'react';
import Loading from './utils/Loading';
import GlobalStyle from './globalStyles';
import ThemeProvider from './contexts/ThemeContext';
import ApplicationContext from './contexts/ApplicationContext';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Branch from './pages/Branch';
import EditAddress from './pages/EditAddress';
import UserInfoContext from './contexts/UserInfoContext';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-placeholder/lib/reactPlaceholder.css';
import AddAddress from './pages/AddAddress';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import MyAddresses from './pages/MyAddresses';
const Aboutus = React.lazy(() => import('./pages/Aboutus'));
const Home = React.lazy(() => import('./pages/Home'));
const Categories = React.lazy(() => import('./pages/Categories'));
const Category = React.lazy(() => import('./pages/Category'));
// const Cart = React.lazy(() => import('./pages/Cart'));
// const Product = React.lazy(() => import('./pages/Product'));
const Branches = React.lazy(() => import('./pages/Branches'));
const Booking = React.lazy(() => import('./pages/Booking'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const SelectLocation = React.lazy(() => import('./pages/SelectLocation'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const MyProfile = React.lazy(() => import('./pages/MyProfile'));
// const MyAddresses = React.lazy(() => import('./pages/MyAddresses'));
const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div>
              There was an error!{' '}
              <button onClick={() => resetErrorBoundary()}>Try again</button>
              <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
            </div>
          )}
          onReset={reset}
        >
          <Suspense fallback={<Loading />}>
            <QueryClientProvider client={queryClient}>
              <ApplicationContext>
                <UserInfoContext>
                  <ThemeProvider>
                    <GlobalStyle />
                    <ScrollToTopOnMount />
                    <AnimatePresence exitBeforeEnter initial={false}>
                      <LazyMotion features={domAnimation}>
                        <Switch location={location} key={location.key}>
                          <Route exact path="/" component={Home} />
                          <Route
                            exact
                            path="/categories"
                            component={Categories}
                          />
                          <Route
                            exact
                            path="/categories/:category"
                            component={Category}
                          />
                          <Route
                            exact
                            path="/products/:id"
                            component={Product}
                          />

                          <Route exact path="/branch/:id" component={Branch} />
                          <Route
                            exact
                            path="/address/edit"
                            component={EditAddress}
                          />

                          <Route
                            exact
                            path="/address/add"
                            component={AddAddress}
                          />

                          <Route exact path="/aboutus" component={Aboutus} />
                          {/* <Route exact path="/cart" component={Cart} /> */}
                          <Route exact path="/branches" component={Branches} />

                          <Route exact path="/booking" component={Booking} />
                          <Route path="/checkout" component={Checkout} />
                          <Route
                            exact
                            path="/location/:edited?"
                            component={SelectLocation}
                          />
                          <Route exact path="/login" component={Login} />
                          <Route exact path="/register" component={Register} />
                          <Route
                            exact
                            path="/user/profile"
                            component={MyProfile}
                          />

                          <Route
                            exact
                            path="/user/addresses"
                            component={MyAddresses}
                          />
                          <Route exact path="/cart" component={Cart} />
                        </Switch>
                      </LazyMotion>
                    </AnimatePresence>
                  </ThemeProvider>
                </UserInfoContext>
              </ApplicationContext>
            </QueryClientProvider>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default App;
