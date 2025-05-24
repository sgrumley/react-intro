import { PageContainer } from "@/components/PageContainer";
import {
	Card,
	CardTitle,
	CardFooter,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

type Program = {
	id: string;
	title: string;
	description: string;
	length: string;
	content: string;
};

const programs: Program[] = [
	{
		id: "1",
		title: "PPL",
		length: "8 Weeks",
		description: "Push Pull Legs, contains a mix of strength and hypertrophy",
		content: "meta data? How many times completed...",
	},
	{
		id: "2",
		title: "Strength",
		length: "8 Weeks",
		description:
			"Strength based program with focus on Bench, Deadlifts and Squats",
		content: "placeholder",
	},
	{
		id: "3",
		title: "Arms - Hypertrophy",
		length: "8 Weeks",
		description: "Arms focused workout. Contains one day and 2 supplement days",
		content: "placeholder",
	},
];

async function queryPrograms() {
	return Promise.resolve(programs);
}

//async function queryPrograms() {
//return await fetch("https://jsonplaceholder.typicode.com/posts").then(
//	(response) => response.json(),
//);
//}

export const Route = createFileRoute("/_layout/gym")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useQuery({
		queryKey: ["test"],
		queryFn: queryPrograms,
	});
	return (
		<PageContainer title="Gym">
			<div className="flex flex-wrap gap-4 p-4">
				{data?.map((program) => (
					<Link
						key={program.id}
						to="/gym/programs/$programId"
						params={{ programId: program.id }}
						className="block"
					>
						<Card className="w-md h-md" key={program.id}>
							<CardHeader>
								<CardTitle>{program.title}</CardTitle>
								<CardDescription>Workout Program</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-4">
								<p>{program.description}</p>
							</CardContent>
							<CardFooter>
								<p>{program.length}</p>
							</CardFooter>
						</Card>
					</Link>
				))}
			</div>
		</PageContainer>
	);
}


