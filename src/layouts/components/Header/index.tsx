import { Layout } from "antd";
import { useSelector } from 'react-redux';

import CollapseIcon from "./components/CollapseIcon";
import BreadcrumbNav from "./components/BreadcrumbNav";
import Language from "./components/Language";
import Theme from "./components/Theme";
import Fullscreen from "./components/Fullscreen";
import "./index.less";

const LayoutHeader = () => {
	const { Header } = Layout;
	const username = useSelector(state => state.global.user);

	return (
		<Header>
			<div className="header-lf">
				<CollapseIcon />
				<BreadcrumbNav />
			</div>
			<div className="header-ri">
				<Language />
				<Theme />
				{/* <Fullscreen /> */}
				<span className="username">{username}</span>
			</div>
		</Header>
	);
};

export default LayoutHeader;
