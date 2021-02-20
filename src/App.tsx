import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ScrollToTopOnMount from './utils/ScrollToTopOnMount';
import { Suspense } from 'react';
import Loading from './utils/Loading';
import GlobalStyle from './globalStyles';
const Aboutus = React.lazy(() => import('./pages/Aboutus'));
const Home = React.lazy(() => import('./pages/Home'));
const Categories = React.lazy(() => import('./pages/Categories'));
const Category = React.lazy(() => import('./pages/Category'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Product = React.lazy(() => import('./pages/Product'));

const queryClient = new QueryClient();

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <GlobalStyle />
          <ScrollToTopOnMount />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/categories" component={Categories} />
            <Route exact path="/categories/:category" component={Category} />
            <Route exact path="/products/:productSlug" component={Product} />
            <Route exact path="/aboutus" component={Aboutus} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </Router>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
