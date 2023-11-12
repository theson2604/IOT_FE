import useFetch from "../hooks/useFetch.jsx";

/**
 *
 * @param uri:string uri to the api to fetch
 * @param renderSuccess:React.Component component to render when the fetch action completes
 * @param loadingFallback:React.Component component to render when the fetch action is in process
 * @param renderError:React.Component component to render in error cases.
 * @returns {*|JSX.Element}
 */
export default function Fetch({
	uri,
	renderSuccess,
	loadingFallback = <p>loading...</p>,
	renderError = (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
}) {
	const { loading, data, error } = useFetch(uri);
	if (loading) return loadingFallback;
	if (error) return renderError(error);
	if (data) return renderSuccess({ data });
}
