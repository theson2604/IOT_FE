export default function useFetch(uri) {
	const [data, setData] = useState();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		console.log(data);
	});
	useEffect(() => {
		if (!uri) return;
		const abortController = new AbortController();
		fetch(uri)
			.then((data) => data.json())
			.then(setData)
			.catch(setError)
			.finally(() => {
				setLoading(false);
			});
		return () => {
			abortController.abort();
		};
	}, [uri]);
	return {
		loading,
		data,
		error,
	};
}
