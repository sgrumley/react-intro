import { PageContainer } from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardTitle,
	CardContent,
	CardHeader,
} from "@/components/ui/cardv0";

import { Plus, Dumbbell, Play, Edit, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export type Exercise = {
	id: string;
	name: string;
	targetMuscle: string;
	equipment: string;
	instructions: string;
};

export type WorkoutExercise = {
	exerciseId: string;
	sets: number;
	reps: string; // e.g., "8-12" or "10"
	weight?: string; // e.g., "135 lbs" or "60 kg"
	restTime?: string; // e.g., "60s" or "2 min"
	notes?: string;
};

export type Workout = {
	id: string;
	name: string;
	description: string;
	exercises: WorkoutExercise[];
	estimatedDuration: number; // in minutes
};

export type Program = {
	id: string;
	name: string;
	description: string;
	workouts: Workout[];
	daysPerWeek: number;
	createdAt: Date;
	updatedAt: Date;
};

const programs: Program[] = [
	{
		id: "ppl",
		name: "Push Pull Legs",
		description:
			"Classic 3-day split focusing on push movements, pull movements, and legs",
		daysPerWeek: 6,
		createdAt: new Date(2023, 5, 1),
		updatedAt: new Date(2023, 5, 1),
		workouts: [
			{
				id: "push",
				name: "Push Day",
				description: "Chest, shoulders, and triceps",
				estimatedDuration: 75,
				exercises: [
					{
						exerciseId: "ex1",
						sets: 4,
						reps: "6-8",
						weight: "185 lbs",
						restTime: "3 min",
					},
					{
						exerciseId: "ex8",
						sets: 3,
						reps: "8-10",
						weight: "70 lbs",
						restTime: "2 min",
					},
					{
						exerciseId: "ex4",
						sets: 3,
						reps: "8-10",
						weight: "95 lbs",
						restTime: "2 min",
					},
					{
						exerciseId: "ex9",
						sets: 3,
						reps: "12-15",
						weight: "25 lbs",
						restTime: "90s",
					},
					{ exerciseId: "ex7", sets: 3, reps: "10-12", restTime: "2 min" },
				],
			},
			{
				id: "pull",
				name: "Pull Day",
				description: "Back and biceps",
				estimatedDuration: 70,
				exercises: [
					{
						exerciseId: "ex3",
						sets: 4,
						reps: "5-6",
						weight: "225 lbs",
						restTime: "3 min",
					},
					{ exerciseId: "ex6", sets: 3, reps: "8-10", restTime: "2 min" },
					{
						exerciseId: "ex5",
						sets: 3,
						reps: "8-10",
						weight: "135 lbs",
						restTime: "2 min",
					},
				],
			},
			{
				id: "legs",
				name: "Leg Day",
				description: "Quadriceps, hamstrings, and calves",
				estimatedDuration: 80,
				exercises: [
					{
						exerciseId: "ex2",
						sets: 4,
						reps: "6-8",
						weight: "205 lbs",
						restTime: "3 min",
					},
					{
						exerciseId: "ex10",
						sets: 3,
						reps: "10-12",
						weight: "40 lbs",
						restTime: "2 min",
					},
				],
			},
		],
	},
];

export type WorkoutLog = {
	id: string;
	programId: string;
	workoutId: string;
	date: Date;
	duration: number; // in minutes
	exercises: {
		exerciseId: string;
		sets: {
			reps: number;
			weight: number;
			completed: boolean;
		}[];
	}[];
	notes?: string;
};



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
		<PageContainer title="Gym (needs breadcrumb)">
			<div className="mx-6 flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold text-gray-900 dark:text-catppuccin-text flex items-center">
						<Dumbbell className="w-6 h-6 mr-2 text-catppuccin-mauve" />
						Gym Tracker
					</h1>
					<p className="text-gray-600 dark:text-catppuccin-subtext0 mt-1">
						Track your workout programs and progress
					</p>
				</div>
				<Button
					// onClick={() => setIsCreatingProgram(true)}
					className="bg-catppuccin-mauve hover:bg-catppuccin-lavender text-catppuccin-base"
				>
					<Plus className="w-4 h-4 mr-2" />
					New Program (no func)
				</Button>
			</div>

			<div className="flex flex-wrap gap-4 p-4">
				{data?.map((program) => (
					<Link
						key={program.id}
						to="/gym/programs/$programId"
						params={{ programId: program.id }}
						className="block"
					>
						<Card
							key={program.id}
							className="bg-white dark:bg-catppuccin-mantle border-gray-200 dark:border-catppuccin-surface0 hover:shadow-md transition-shadow cursor-pointer"
						>
							<CardHeader>
								<div className="flex justify-between items-start">
									<div>
										<CardTitle className="text-gray-900 dark:text-catppuccin-text">
											{program.name}
										</CardTitle>
										<p className="text-sm text-gray-600 dark:text-catppuccin-subtext0 mt-1">
											{program.description}
										</p>
									</div>
									<div className="flex space-x-1">
										<Button variant="ghost" size="icon" className="h-8 w-8">
											<Edit className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-red-600 dark:text-catppuccin-red"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-600 dark:text-catppuccin-subtext0">
											Workouts
										</span>
										<Badge className="bg-catppuccin-surface0 text-catppuccin-subtext0">
											{program.workouts.length}
										</Badge>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-600 dark:text-catppuccin-subtext0">
											Days per week
										</span>
										<Badge className="bg-catppuccin-surface0 text-catppuccin-subtext0">
											{program.daysPerWeek}
										</Badge>
									</div>
									<div className="pt-2">
										<Button
											size="sm"
											className="w-full bg-catppuccin-blue hover:bg-catppuccin-sapphire text-catppuccin-base"
										>
											<Play className="w-4 h-4 mr-2" />
											View Workouts
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</PageContainer>
	);
}
