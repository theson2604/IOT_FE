import './App.css';
import Header from './components/layouts/CustomedHeader';
import Content from './components/layouts/CustomedContent';
import Footer from './components/layouts/CustomedFooter';
import { Layout, theme } from 'antd';
import Chart from './components/Chart';
function App() {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Layout className='layout'>
			<Header />
			<Content colorBgContainer={colorBgContainer}>
				<Chart />
			</Content>
			<Footer>UniInfra Management ©2023 Created by Lê Thành</Footer>
		</Layout>
	);
}

export default App;
