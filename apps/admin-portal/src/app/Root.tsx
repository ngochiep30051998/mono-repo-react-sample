import { LoadingProvider } from '@features/admin/auth';
import Router from './routing';

const Root = () => {
  return (
    <LoadingProvider>
      <Router />
    </LoadingProvider>
  );
};

export default Root;
