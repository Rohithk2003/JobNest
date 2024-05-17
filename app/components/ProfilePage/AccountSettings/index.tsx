const AccountSettings: React.FC<{}> = () => {
	return (
		<main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
			<div className="p-2 md:p-4">
				<div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
					<h2 className="text-2xl font-bold sm:text-xl">Account settings</h2>

					<div className="grid max-w-2xl mx-auto mt-8">
						<button>Delete account</button>
					</div>
				</div>
			</div>
		</main>
	);
};
export default AccountSettings;
