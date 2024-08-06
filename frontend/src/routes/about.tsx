import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	return (
		<div className="p-2">
			<h3>Coming Soon!</h3>
		</div>
	);
}

