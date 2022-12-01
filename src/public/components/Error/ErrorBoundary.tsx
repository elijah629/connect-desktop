import * as React from "react";
import { useRouteError } from "react-router-dom";

export function ErrorBoundary() {
	const error = useRouteError();
	// console.error(error);

	return <p>{JSON.stringify(error)}</p>;
}
