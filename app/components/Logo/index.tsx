import { getIconLocation } from "@/configs/constants";
import Image from "next/image";
export default function Logo() {
	return (
		<a
			href="#"
			className="flex items-center mb-6 text-2xl justify-center w-full font-semibold text-gray-900 dark:text-white"
		>
			<Image
				className=" mr-2"
				src={getIconLocation()}
				alt="logo"
				width={64}
				height={64}
			/>
			<p>JobNest</p>
		</a>
	);
}
