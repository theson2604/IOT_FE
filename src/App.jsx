import './App.css';
import Header from './components/layouts/CustomedHeader';
import Content from './components/layouts/CustomedContent';
import Footer from './components/layouts/CustomedFooter';
import {Layout, theme} from 'antd';
import MonitoringChart from './components/MonitoringChart';
function App() {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        <Layout className='layout'>
            <Header/>
            <Content colorBgContainer={colorBgContainer}>
                <div style={{width: 700, display: "flex", justifyContent: "center", alignItems: 'center'}}>
                    <MonitoringChart
                        uri={`http://localhost:4000/temperatures`}
                    />
                </div>
            </Content>
            <Footer>UniInfra Management ©2023 Created by Lê Thành</Footer>
        </Layout>
    );
}

export default App;
