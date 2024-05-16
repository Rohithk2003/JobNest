import * as React from "react";

export default function Page({ params }: { params: { job: string } }) {
	return (
		<div>
			<div>Post: {params.job}</div>
		</div>
	);
}
