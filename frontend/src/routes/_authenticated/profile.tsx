import { createFileRoute } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/profile")({
	component: Profile,
});

function Profile() {
	const { isPending, error, data } = useQuery(userQueryOptions);

	if (isPending) return "Loading";
	if (error) return "Not Logged In";

	return (
		<div className="p-2">
			<div className="flex items-center">
				{/* BUG: AvatarImage does not show */}
				<Avatar>
					{data.user.picture && (
						<AvatarImage src={data.user.picture} alt={data.user.given_name} />
					)}
					<AvatarFallback>{data.user.given_name[0]}</AvatarFallback>
				</Avatar>
				<p>
					{data.user.given_name} {data.user.family_name}
				</p>
			</div>
			<Button asChild>
				<a href="/api/logout">Logout</a>
			</Button>
		</div>
	);
}

