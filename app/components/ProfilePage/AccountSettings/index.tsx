const AccountSettings: React.FC<{}> = () => {
	return (
		<main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
			<div className="p-2 md:p-4">
				<div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
					<h2 className="text-2xl font-bold sm:text-xl">Account settings</h2>
					<div className="grid w-44 p-3 rounded-full hover:bg-white transition-all ease-in-out hover:text-black mt-8 bg-primary-400">
						<button>Delete account</button>
					</div>
				</div>
			</div>
		</main>
	);
};
export default AccountSettings;
