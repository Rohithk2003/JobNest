import { useSession } from "next-auth/react";
import {
	Dispatch,
	MouseEventHandler,
	SetStateAction,
	use,
	useEffect,
	useState,
} from "react";
import Image from "next/image";
import { set } from "firebase/database";
import { createClient } from "@/utils/supabase/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import ProfileImageSkeleton from "../../Loader/ProfileImageSkeleton";
import { getIconLocation, getSignOutRoute } from "@/configs/constants";
import { Session } from "next-auth";
import { MdAccountCircle } from "react-icons/md";

export default function Header({
	sideBarOpen,
	setSideBarOpen,
	fromMainPage,
	session,
}: {
	sideBarOpen: boolean;
	setSideBarOpen: Dispatch<SetStateAction<boolean>>;
	fromMainPage: boolean | undefined;
	session: Session | null;
}) {
	const { update } = useSession();
	const supabase = createClient();
	const [link, setLink] = useState("");
	const pathname = usePathname();
	const { replace } = useRouter();
	const searchParams = useSearchParams();

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set("search", term);
		} else {
			params.delete("search");
		}
		replace(`${pathname}?${params.toString()}`);
	}, 0);

	useEffect(() => {
		const fetchData = async () => {
			if (
				session &&
				session.user.provider === "custom-signin" &&
				session.user.image &&
				!session.user.image?.startsWith("http")
			) {
				if (session.user.image) {
					const { data: link, error } = await supabase.storage
						.from("jobnest")
						.createSignedUrl(session.user.image, 3600);
					setLink(link?.signedUrl ?? "");
					update({
						user: {
							...session?.user,
							avatar: link?.signedUrl,
						},
					});
				}
			}
		};
		fetchData();
	}, [session, supabase.storage, update]);

	const [showDropDown, setShowDropDown] = useState(false);
	const [dropdownToggler, setDropdownToggler] = useState(false);
	return (
		<nav
			onClick={(e) => {
				var element = e.target as HTMLElement;
				if (element.tagName != "IMG") setShowDropDown(false);
			}}
			className="relative bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-transparent backdrop-blur-lg dark:border-gray-700  left-0 right-0 top-0 z-[901]"
		>
			<div className="flex flex-wrap justify-between items-center relative">
				{fromMainPage && (
					<div className=" gap-2 xl:flex hidden flex-row justify-end text-white items-center absolute left-0 top-0">
						<Image
							src={getIconLocation()}
							alt="Icon"
							width={50}
							height={50}
						/>
						<p className="text-2xl">JobNest</p>
					</div>
				)}
				<div className="flex justify-start items-center">
					<div className="bg-transparent flex flex-row items-center justify-center gap-10 mr-5">
						<button
							onClick={() => {
								setSideBarOpen(!sideBarOpen);
							}}
							className="block rounded bg-transparent p-2.5 text-white transition "
						>
							<span className="sr-only">Toggle menu</span>
							{sideBarOpen ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
				<div className="flex justify-between items-center flex-row">
					<div className="relative md:w-96">
						<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
							<svg
								className="w-5 h-5 text-gray-500 dark:text-gray-400"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								></path>
							</svg>
						</div>
						<input
							type="text"
							name="text"
							id="topbar-search"
							className="bg-gray-50  transition-all ease-in-out border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							placeholder="Search for jobs, companies, and more"
							onChange={(e) => {
								handleSearch(e.target.value);
							}}
							defaultValue={searchParams.get("search")?.toString()}
						/>
					</div>
				</div>
				<div className="flex items-center lg:order-2">
					<button
						type="button"
						data-drawer-toggle="drawer-navigation"
						aria-controls="drawer-navigation"
						className="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
					>
						<span className="sr-only">Toggle search</span>
						<svg
							aria-hidden="true"
							className="w-6 h-6"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								clipRule="evenodd"
								fillRule="evenodd"
								d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							></path>
						</svg>
					</button>

					<button
						type="button"
						className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
						onClick={() => {
							setDropdownToggler(!dropdownToggler);
						}}
					>
						<span className="sr-only">Open user menu</span>
						{session ? (
							session.user.image || session.user.image ? (
								<Image
									className="w-8 h-8 rounded-full"
									src={
										session?.user.provider === "custom-signin"
											? session.user.image?.startsWith("http")
												? session.user.image
												: link
											: session?.user.image || ""
									}
									alt="user photo"
									width={32}
									height={32}
								/>
							) : (
								<MdAccountCircle
									className="avatar object-cover z-30 w-8 h-8 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
									width={160}
									height={160}
								/>
							)
						) : (
							<div>
								<ProfileImageSkeleton
									width={40}
									height={40}
								/>
							</div>
						)}
					</button>
					<div
						className={`${
							dropdownToggler ? "block" : "hidden"
						} z-50 my-4 w-56 text-base absolute right-4 top-6 list-none bg-white  divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl`}
					>
						<div className="py-3 px-4">
							Signed in as
							<span className="block text-sm font-semibold text-gray-900 dark:text-white">
								{session?.user.username}
							</span>
						</div>
						<ul
							className="py-1 text-gray-700 dark:text-gray-300"
							aria-labelledby="dropdown"
						>
							<li>
								<a
									href="/user/profile"
									className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
								>
									My profile
								</a>
							</li>
						</ul>
						<ul
							className="py-1 text-gray-700 dark:text-gray-300"
							aria-labelledby="dropdown"
						>
							<li>
								<a
									href="#"
									className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									<svg
										className="mr-2 w-5 h-5 text-gray-400"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
											clipRule="evenodd"
										></path>
									</svg>
									My likes
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									<svg
										className="mr-2 w-5 h-5 text-gray-400"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
									</svg>
									Collections
								</a>
							</li>
						</ul>
						<ul
							className="py-1 text-gray-700 dark:text-gray-300"
							aria-labelledby="dropdown"
						>
							<li>
								<a
									href={getSignOutRoute()}
									className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									Sign out
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
}
