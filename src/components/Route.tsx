import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import { Route as RouterRoute } from "react-router-dom";
import ErrorBoundaryComponent from "./ErrorBoundaryComponent";

interface IProps {
  component: React.FC;
  path: string;
  exact?: boolean;
}

const Route = ({ component, path, exact }: IProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onError={(err) => console.log(err)}
          FallbackComponent={ErrorBoundaryComponent}
          onReset={reset}
        >
          <Suspense fallback={<div>Loading</div>}>
            <RouterRoute exact={exact} component={component} path={path} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default Route;
