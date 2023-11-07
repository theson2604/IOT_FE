import React from 'react';
import { LineChart } from '@mui/x-charts';
import { Box, Slider } from '@mui/material';
function Chart({ data = [2, 5.5, 2, 8.5, 1.5, 5] }) {
	const [value, setValue] = React.useState([-25, 25]);
	const minDistance = 10;
	const handleChange = (event, newValue, activeThumb) => {
		if (!Array.isArray(newValue)) {
			return;
		}
		if (newValue[1] - newValue[0] < minDistance) {
			if (activeThumb === 0) {
				const clamped = Math.min(newValue[0], 100 - minDistance);
				setValue([clamped, clamped + minDistance]);
			} else {
				const clamped = Math.max(newValue[1], minDistance);
				setValue([clamped - minDistance, clamped]);
			}
		} else {
			setValue([...newValue]);
		}
	};
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Box sx={{ width: '100%', maxWidth: 500 }}>
				<LineChart
					xAxis={[
						{
							label: 'timestamp',
							min: value[0],
							max: value[1],
							data: Array(value[1] - value[0])
								.fill(0)
								.map((_, i) => i + value[0]),
						},
					]}
					series={[{ data }]}
					width={500}
					height={300}
				/>
				<Slider
					value={value}
					onChange={handleChange}
					valueLabelDisplay='auto'
					min={-40}
					max={40}
					sx={{ mt: 2 }}
				/>
			</Box>
		</div>
	);
}

export default Chart;
