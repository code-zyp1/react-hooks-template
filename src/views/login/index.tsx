import LoginForm from "./components/LoginForm";
import SwitchDark from "@/components/SwitchDark";
import loginLeft from "@/assets/images/login_back.png";
import logo from "@/assets/images/logo.png";
import "./index.less";

const Login = () => {
	return (
		<div className="login-container">
			<LoginForm/>
		</div>
	);
};

export default Login;
