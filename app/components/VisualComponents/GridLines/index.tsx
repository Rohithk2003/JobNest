"use client";

import { useEffect } from "react";

export default function GridLines() {
	useEffect(() => {
		const rowcol = document.getElementById("container");

		const colres = Math.round(window.innerWidth / 30);
		const rowres = Math.round(window.innerHeight / 30);

		rowcol?.style.setProperty("--rescol", colres.toString());

		const numsq = colres * rowres;

		for (var i = 0; i < numsq; i++) {
			let box = document.createElement("span");
			document.getElementById("container")?.appendChild(box);
		}

		let cursor = document.getElementById("cursor")?.style;
		if (cursor)
			window.onmousemove = function (e) {
				cursor.left = e.clientX + "px";
				cursor.top = e.clientY + "px";
			};
	});
	return (
		<div className="d-none d-sm-block z-[-1]">
			<div id="container"></div>
			<div id="cursor"></div>
		</div>
	);
}
