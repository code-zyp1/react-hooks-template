import md5 from "js-md5";
import { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Login } from "@/api/interface";
import { loginApi, getAuthor, keepAlive } from "@/api/modules/login";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setToken, setUser, setUserType } from "@/redux/modules/global/action";
import { useTranslation } from "react-i18next";
// import { setTabsList } from "@/redux/modules/tabs/action";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";





const LoginForm = (props: any) => {
	const { t } = useTranslation();
	const { setToken, setUser, setUserType } = props;
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

	//组件卸载时关闭计时器
	useEffect(() => {
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		}
	}, [intervalId]);

	const onFinish = async (loginForm: Login.ReqLoginForm) => {
		try {
			setLoading(true);
			loginForm.password = md5(loginForm.password);
			const response = await loginApi(loginForm);
			console.log('login res', response)
			if (response) {
				let data = response;
				if (response.bStatus && data.strSession) {
					console.log('login sucess')
					setToken(data.strSession)
					let loginData: Login.ReqCommon = {
						username: loginForm.username,
						session: data.strSession
					}

					const authorRes = await getAuthor(loginData);
					console.log('authorRes', authorRes)
					// 这里假设 getAuthor 返回的数据中有 strUser 和 strUserType
					if (authorRes) {
						const { strUser, strUserType } = authorRes;
						setUser(strUser);
						setUserType(strUserType);
						console.log('user type', strUser, strUserType)

						let keepAliveData: Login.ReqCommon = {
							session: data.strSession
						}

						const id = setInterval(async () => {
							const keepAliveRes = await keepAlive(keepAliveData)
							console.log('keepAlive Data', keepAliveRes)
						}, 5 * 60 * 1000); // 5 minutes in milliseconds

						setIntervalId(id);

						message.success("登录成功！");
						navigate(HOME_URL);
					}


				}
				// ... 剩下的代码 ...
			} else {
				// 处理没有数据的情况，例如显示错误信息
				message.error("登录失败，请重试");
			}
		} finally {
			setLoading(false);
		}
	};







	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
				<Input placeholder="用户名" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
				<Input.Password autoComplete="new-password" placeholder="密码" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item className="login-btn">
				<Button
					onClick={() => {
						form.resetFields();
					}}
					icon={<CloseCircleOutlined />}
				>
					{t("login.reset")}
				</Button>
				<Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
					{t("login.confirm")}
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapDispatchToProps = { setToken, setUser, setUserType };
export default connect(null, mapDispatchToProps)(LoginForm);
