import { LoadingProvider } from '@contexts';
import Router from './routing';

const Root = () => {
  return (
    <LoadingProvider>
      <Router />
    </LoadingProvider>
  );
};

export default Root;

