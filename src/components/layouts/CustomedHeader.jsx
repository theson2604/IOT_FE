import React from 'react';
import { Header } from 'antd/es/layout/layout';
import { Menu } from 'antd';
function CustomedHeader() {
	const contentPanel = ['Dashboard', 'Monitor', 'Settings'];
	return (
		<Header>
			<div className='demo-logo' />
			<Menu
				theme='dark'
				mode='horizontal'
				defaultSelectedKeys={['1']}
				items={contentPanel.map((title, index) => ({
					key: `nav ${index + 1}`,
					label: title,
				}))}
			/>
		</Header>
	);
}

export default CustomedHeader;
