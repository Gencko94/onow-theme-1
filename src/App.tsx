import './styles/transitions.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
import { CSSTransition } from 'react-transition-group';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Branch from './pages/Branch';
import EditAddress from './pages/EditAddress';
import UserInfoContext from './contexts/UserInfoContext';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-placeholder/lib/reactPlaceholder.css';
import AddAddress from './pages/AddAddress';
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
const MyAddresses = React.lazy(() => import('./pages/MyAddresses'));
const queryClient = new QueryClient();

function App() {
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
                    <Router>
                      <GlobalStyle />
                      <ScrollToTopOnMount />

                      <Route exact path="/" component={Home} />
                      <Route exact path="/categories" component={Categories} />
                      <Route
                        exact
                        path="/categories/:category"
                        component={Category}
                      />
                      <Route exact path="/products/:id">
                        {({ match }) => (
                          <CSSTransition
                            in={match !== null}
                            classNames="pages"
                            timeout={250}
                            unmountOnExit
                          >
                            <div className="pages">
                              <Product />
                            </div>
                          </CSSTransition>
                        )}
                      </Route>
                      <Route exact path="/cart">
                        {({ match }) => (
                          <CSSTransition
                            in={match !== null}
                            classNames="pages"
                            timeout={250}
                            unmountOnExit
                          >
                            <div className="pages">
                              <Cart />
                            </div>
                          </CSSTransition>
                        )}
                      </Route>
                      <Route exact path="/branch/:id">
                        {({ match }) => (
                          <CSSTransition
                            in={match !== null}
                            classNames="pages"
                            timeout={250}
                            unmountOnExit
                          >
                            <div className="pages">
                              <Branch />
                            </div>
                          </CSSTransition>
                        )}
                      </Route>
                      <Route exact path="/address/edit">
                        {({ match }) => (
                          <CSSTransition
                            in={match !== null}
                            classNames="pages"
                            timeout={250}
                            unmountOnExit
                          >
                            <div className="pages">
                              <EditAddress />
                            </div>
                          </CSSTransition>
                        )}
                      </Route>
                      <Route exact path="/address/add">
                        {({ match }) => (
                          <CSSTransition
                            in={match !== null}
                            classNames="pages"
                            timeout={250}
                            unmountOnExit
                          >
                            <div className="pages">
                              <AddAddress />
                            </div>
                          </CSSTransition>
                        )}
                      </Route>
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
                      <Route exact path="/user/profile" component={MyProfile} />
                      <Route
                        exact
                        path="/user/addresses"
                        component={MyAddresses}
                      />
                      {/* <Route exact path="*" component={Home} /> */}
                    </Router>
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
