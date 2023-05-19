// * 请求响应参数(不包含data)
export interface Result {
	code: string;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
	bStatus?: boolean;
	bWeakPassword?: boolean;
	nFaultTimes?: number;
	nTimeout?: number;
	strSession?: string;
	tLockTimeResidue?: number;
	strUser?: string;
	strUserType?: string;
}

// * 分页响应参数
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// //普通请求
// export interface ReqCommon {
// 	username: string;
// 	session: string
// }



// * 登录
export namespace Login {

	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface LoginData {
		[key: string]: any; // 表示可以存在任意其他属性
		bStatus: boolean;
		bWeakPassword: boolean;
		nFaultTimes: number;
		nTimeout: number;
		strSession: string;
		tLockTimeResidue: number
	}
	export interface ReqCommon {
		username?: string;
		session?: string;
		[key: string]: any; // 表示可以存在任意其他属性

	}
	export interface AuthorRes {
		strUser: string;
		strUserType: string;
		[key: string]: any; // 表示可以存在任意其他属性
	}
	export interface ResLogin {
		[x: string]: any;
		access_token: string;
	}
	export interface ResAuthButtons {
		[propName: string]: any;
	}
}
