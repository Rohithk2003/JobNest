import { DefaultSession, getServerSession } from "next-auth";
import Header from "./Header";
import Sidebar from "./Sidebar";
import router from "next/navigation";
interface Session {
	user: {
		username: string | null;
	} & DefaultSession["user"];
}

export default async function Navigation() {
	const session = await getServerSession();
	if (!session) router?.useRouter().push("/");

	console.log(session);
	return (
		<>
			<Header />
			{session?.user ? <Sidebar /> : null}
		</>
	);
}
