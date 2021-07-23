import { Redirect, Route } from "react-router-dom";

import { Suspense, useContext } from "react";
import { QueryErrorResetBoundary } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryComponent from "./ErrorBoundaryComponent";
import { AuthProvider } from "../contexts/AuthContext";
import Loading from "../utils/Loading";

interface IProps {
  path: string;
  Component: React.FC;
}

export default function ProtectedRoute({ Component, path }: IProps) {
  const { user } = useContext(AuthProvider);

  return (
    <Route
      exact
      path={path}
      render={({ location }) => {
        // Check if authentication is successful.
        if (user) {
          // If Successful , check user permissions.

          return (
            <QueryErrorResetBoundary>
              {({ reset }) => (
                <ErrorBoundary
                  onError={(err) => console.log(err)}
                  FallbackComponent={ErrorBoundaryComponent}
                  onReset={reset}
                >
                  <Suspense fallback={<Loading />}>
                    <Component />
                  </Suspense>
                </ErrorBoundary>
              )}
            </QueryErrorResetBoundary>
          );
          // User Don't have permissions
        } else {
          // No Token or Broken Token
          return (
            <Redirect
              to={{
                pathname: `/`,
                state: location.pathname,
              }}
            />
          );
        }
      }}
    />
  );
}
