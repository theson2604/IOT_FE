import { useEffect, useState } from 'react';
import { SSE } from 'sse.js';
export default function useSSE(uri, onMessage = (f) => f) {
	useEffect(() => {
		try {
			const sse = new SSE(uri, {
				headers: { 'ngrok-skip-browser-warning': 123 },
			});
			sse.onopen = () => console.log(`Registered to ${uri}`);
			sse.onmessage = onMessage;
			sse.onerror = (_error) => {
				sse.close();
			};
			window.addEventListener('beforeunload', () => {
				sse.close();
			});
			return () => sse.close();
		} catch (err) {
			return false;
		}
	}, [uri]);
	return true;
}
