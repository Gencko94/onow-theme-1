import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './pages/Home';
import ScrollToTopOnMount from './utils/ScrollToTopOnMount';
import { Suspense } from 'react';
import Loading from './utils/Loading';

const queryClient = new QueryClient();

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ScrollToTopOnMount />
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
