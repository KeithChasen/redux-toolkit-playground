import { authApi } from '../services/AuthService';

const Login = () => {
	const [login, { isLoading, isError }] = authApi.useLoginMutation();
	//...
};

export default Login;
