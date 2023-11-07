import React from 'react';
import { Content } from 'antd/es/layout/layout';
function CustomedContent({ children = {} }) {
	return <Content style={{ padding: '0 50px' }}>{children}</Content>;
}

export default CustomedContent;
