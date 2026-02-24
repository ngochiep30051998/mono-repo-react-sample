import { cache, AUTH_USER_CACHE_KEY } from '@core';
import { useNavigate } from 'react-router';
import { useLoading } from '../contexts/LoadingContext';
import { LoginForm, type LoginFormValues } from '@ui';
import { getRolesFromBackend } from '../services/auth.service';
import { getPermissionsForRoles } from '../config/rbac.config';
import useAuthStore from '../store/useAuthStore';

export default function Login() {
  const navigate = useNavigate();
  const loading = useLoading();
  const setRolesAndPermissions = useAuthStore((s) => s.setRolesAndPermissions);

  const handleFinish = async (values: LoginFormValues) => {
    loading.show();
    try {
      const roles = await getRolesFromBackend(values.username);
      const permissions = getPermissionsForRoles(roles);
      cache.setCache(AUTH_USER_CACHE_KEY, {
        token: 'demo-token',
        username: values.username,
        remember: values.remember,
      });
      setRolesAndPermissions(roles, permissions);
      navigate('/');
    } finally {
      loading.hide();
    }
  };

  return <LoginForm onFinish={handleFinish} />;
}
