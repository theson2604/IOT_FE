import React, { useEffect, useRef, useState } from 'react';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import {
	TimeScale,
	Chart,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Tooltip,
} from 'chart.js';
Chart.register(
	zoomPlugin,
	LineElement,
	TimeScale,
	LinearScale,
	PointElement,
	Tooltip,
	Legend,
	StreamingPlugin
);
function RealTimeChart({ uri, label }) {
	const chartRef = useRef(null);
	const [error, setError] = useState();
	useEffect(() => {
		(async () => {
			const sse = new EventSource(uri);
			sse.onopen = () => console.log('Connect successfully');
			sse.onmessage = (event) => {
				const eventData = JSON.parse(event.data);
				console.log(eventData);
				if (chartRef) {
					chartRef.current.data.datasets[0].data.push({
						x: parseInt(eventData.timestamp),
						y: parseFloat(eventData.data),
					});
				}
			};
			sse.onerror = (_error) => {
				console.log(error);
				setError(_error.target);
				sse.close();
			};
			window.addEventListener('beforeunload', () => {
				sse.close();
			});
			return () => sse.close();
		})();
	}, [uri]);
	return (
		<>
			{error ? (
				<div>{error}</div>
			) : (
				<Line
					ref={chartRef}
					data={{
						datasets: [
							{
								data: [],
								backgroundColor: 'rgba(255, 99, 132, 0.5)',
								borderColor: 'rgb(255, 99, 132)',
								borderDash: [8, 4],
								label,
							},
						],
					}}
					options={{
						scales: {
							x: {
								type: 'realtime',
							},
						},
						plugins: {
							zoom: {
								pan: {
									enabled: true,
									mode: 'x',
								},
								zoom: {
									wheel: {
										enabled: true,
									},
									mode: 'x',
								},
							},
						},
					}}
				/>
			)}
		</>
	);
}

export default RealTimeChart;
