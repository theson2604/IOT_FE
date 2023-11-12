// eslint-disable-next-line no-unused-vars
import React, {useEffect, useRef, useState} from "react";
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
import {Line} from "react-chartjs-2";
import {Chart, registerables } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
Chart.register(
    StreamingPlugin,
    zoomPlugin,
    ...registerables
);
function RealTimeChart({url, label}) {
    const realTimedata = useRef([]);
    const [error, setError] = useState();
    useEffect(() => {
        (async () => {
            const sse = new EventSource(url);
            sse.onopen = () => console.log('Connect successfully');
            sse.onmessage = (event) => {
                const eventData = JSON.parse(event.data);
                console.log(eventData);
                realTimedata.current.push({
                    x: parseInt(eventData.timestamp),
                    y: parseFloat(eventData.data)
                });
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
    }, [url]);
    return <>{error
        ? <div>{error}</div>
        : <Line
            data={{
                datasets: [{
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderDash: [8, 4],
                    label
                }],
            }}
            options={{
                scales: {
                    x: {
                        type: 'realtime',
                        realtime: {
                            onRefresh: chart => {
                                const series = chart.data.datasets[0];
                                if (JSON.stringify(realTimedata.current) !== JSON.stringify(series.data)) {
                                    series.data = realTimedata.current;
                                }
                            }
                        }
                    },
                },
                plugins: {
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'x'
                        },
                        zoom: {
                            wheel: {
                                enabled: true
                            },
                            mode: 'x'
                        }
                    }
                }
            }}
        />
    }</>
}

export default RealTimeChart;