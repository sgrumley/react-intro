import { PageContainer } from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardTitle,
	CardFooter,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

type Workout = {
	id: string;
	title: string;
	description: string;
};

const workouts: Workout[] = [
	{
		id: "1",
		title: "Push",
		description: "List of exercises",
	},
	{
		id: "2",
		title: "Pull",
		description: "List of exercises",
	},
	{
		id: "3",
		title: "Legs",
		description: "List of exercises",
	},
];

async function queryWorkout() {
	console.log("queryWorkout called");
	return Promise.resolve(workouts);
}

export const Route = createFileRoute('/_layout/gym_/programs_/$programId')({
  component: RouteComponent,
})

function RouteComponent() {
	console.log("RouteComponent rendering");
	
	const { programId } = Route.useParams();
	console.log("Program ID from params:", programId);
	
	const { data, isLoading, error } = useQuery({
		queryKey: ["test2"],
		queryFn: queryWorkout,
	});
	
	console.log("Query state:", { data, isLoading, error });

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error loading workouts</div>;
	}

	return (
		<PageContainer title="Gym">
			<div>
				<h2>Program ID: {programId}</h2>
				<div className="flex flex-wrap gap-4 p-4">
					{data?.map((workout) => (
						<Card className="w-80 h-fit" key={workout.id}>
							<CardHeader>
								<CardTitle>{workout.title}</CardTitle>
								<CardDescription>Workout Program</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-4">
								<p>{workout.description}</p>
							</CardContent>
							<CardFooter>
								<Button>Start Workout</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</PageContainer>
	);
}
//import { PageContainer } from "@/components/PageContainer";
//import { Button } from "@/components/ui/button";
//import {
//	Card,
//	CardTitle,
//	CardFooter,
//	CardContent,
//	CardDescription,
//	CardHeader,
//} from "@/components/ui/card";
//import { useQuery } from "@tanstack/react-query";
//import { createFileRoute  } from "@tanstack/react-router";
//
//type Workout = {
//	id: string;
//	title: string;
//	description: string;
//};
//
//const workouts: Workout[] = [
//	{
//		id: "1",
//		title: "Push",
//		description: "List of exercises",
//	},
//	{
//		id: "2",
//		title: "Pull",
//		description: "List of exercises",
//	},
//	{
//		id: "3",
//		title: "Legs",
//		description: "List of exercises",
//	},
//];
//
//async function queryWorkout() {
//	return Promise.resolve(workouts);
//}
//
//export const Route = createFileRoute("/_layout/gym_/programs_/$programId")({
//	component: RouteComponent,
//});
//
//function RouteComponent() {
//	const { data } = useQuery({
//		queryKey: ["test1"],
//		queryFn: queryWorkout,
//	});
//	return (
//		<PageContainer title="Gym Workouts">
//			<div className="flex flex-wrap gap-4 p-4">
//				{data?.map((workout) => (
//					//<Link
//					//						key={program.id}
//					//						to="/gym/programs/$programID"
//					//						params={{ programID: program.id }}
//					//						className="block"
//					//					>
//					<Card className="w-md h-md" key={workout.id}>
//						<CardHeader>
//							<CardTitle>{workout.title}</CardTitle>
//							<CardDescription>Workout Program</CardDescription>
//						</CardHeader>
//						<CardContent className="grid gap-4">
//							<p>{workout.description}</p>
//						</CardContent>
//						<CardFooter>
//							<Button>Start Workout</Button>
//						</CardFooter>
//					</Card>
//					//</Link>
//				))}
//			</div>
//		</PageContainer>
//	);
//}
