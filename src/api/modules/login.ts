import { Login } from "@/api/interface/index";
import { APIV1 } from "@/api/config/servicePort";
import qs from "qs";

import http from "@/api";

/**
 * @name 登录模块
 */
// * 用户登录接口
// export const loginApi = (params: Login.ReqLoginForm) => {
// 	return http.post<Login.ResLogin>(PORT1 + `/login`, params);
// 	return http.post<Login.ResLogin>(PORT1 + `/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
// 	return http.post<Login.ResLogin>(PORT1 + `/login`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
// 	return http.post<Login.ResLogin>(PORT1 + `/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
// };

export const loginApi = ({ username, password }: Login.ReqLoginForm) => {
	const url = `${APIV1}/api/v1/Login?user=${username}&password=${password}`;
	return http.get<Login.LoginData>(url);
};

// * 获取用户权限

export const getAuthor = ({ username, session }: Login.ReqCommon) => {
	const url = `${APIV1}/api/v1/GetUserInfo?user=${username}&session=${session}`;
	return http.get<Login.AuthorRes>(url);
};

// var url =root + "/api/v1/Keepalive?session=" +session;
// 保活 session
export const keepAlive = ({ session }: Login.ReqCommon) => {
	const url = `${APIV1}/api/v1/Keepalive?session=${session}`;
	return http.get<Login.ReqCommon>(url);
};


// * 获取按钮权限
export const getAuthorButtons = () => {
	return http.get<Login.ResAuthButtons>(APIV1 + `/auth/buttons`);
};

// * 获取菜单列表
export const getMenuList = () => {
	return http.get<Menu.MenuOptions[]>(APIV1 + `/menu/list`);
};
