"use client";

import { useEffect } from "react";

export default function BackgroundGlow() {
	useEffect(() => {
		document.addEventListener("mousemove", function (event) {
			if ("ontouchstart" in window || navigator.maxTouchPoints) {
				return;
			}
			var followDiv = document.getElementsByClassName(
				"bg-glow"
			)[0] as HTMLDivElement;
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;
			const mouseX = event.clientX - 150;
			const mouseY = event.clientY - 150;

			const maxLeft = viewportWidth - followDiv.offsetWidth;
			const maxTop = viewportHeight - followDiv.offsetHeight;

			followDiv.style.left = Math.min(mouseX, maxLeft) + "px";
			followDiv.style.top = Math.min(mouseY, maxTop) + "px";
		});
	}, []);
	return (
		<div
			className="absolute inset-0 bg-glow max-w-xs h-[357px] z-[0] blur-[118px] sm:max-w-md md:max-w-lg"
			style={{
				background:
					"linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
			}}
		></div>
	);
}
