"use server";
import DashboardNavigation from "@/components/DashboardNavigation/layout";
import { JobFullInfo } from "@/components/component/job-full-info";
import { getaBackendRoute } from "@/configs/constants";
import { Job } from "@/types/custom";
import { getServerSession } from "next-auth";
import * as React from "react";

// "id": self.id,
// "title": self.title,
// "company": self.company,
// "location": self.location,
// "description": self.description,
// "metadata": self.metadata,
// "link": self.link,
// "days": self.days,
// "platform": self.platform,

export default async function Page({ params }: { params: { job: string } }) {
	const res = await fetch(
		`${getaBackendRoute()}/api/job/${parseInt(params.job)}`
	);
	const data: {
		status: string;
		data: Job;
	} = await res.json();
	if (!data) {
		return <div>Job not found</div>;
	}
	const session = await getServerSession();
	return (
		<>
			<DashboardNavigation
				fromMainPage={undefined}
				session={session}
			/>
			<div>
				<JobFullInfo data={data.data} />
			</div>
		</>
	);
}
