import { PageContainer } from "@/components/PageContainer";
import { Play, Clock, Target } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardTitle,
	CardContent,
	CardHeader,
} from "@/components/ui/cardv0";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export type Exercise = {
	id: string;
	name: string;
	targetMuscle: string;
	equipment: string;
	instructions: string;
};

export type Workout = {
	id: string;
	name: string;
	description: string;
	exercises: WorkoutExercise[];
	estimatedDuration: number; // in minutes
};

export type WorkoutExercise = {
	exerciseId: string;
	sets: number;
	reps: string; // e.g., "8-12" or "10"
	weight?: string; // e.g., "135 lbs" or "60 kg"
	restTime?: string; // e.g., "60s" or "2 min"
	notes?: string;
};

const workouts:  Workout[] = [
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
] 

const exercises: Exercise[] = [
  {
    id: "ex1",
    name: "Bench Press",
    targetMuscle: "Chest",
    equipment: "Barbell",
    instructions: "Lie on bench, press barbell up from chest",
  },
  {
    id: "ex2",
    name: "Squat",
    targetMuscle: "Legs",
    equipment: "Barbell",
    instructions: "Stand with feet shoulder-width apart, squat down keeping knees behind toes",
  },
  {
    id: "ex3",
    name: "Deadlift",
    targetMuscle: "Back",
    equipment: "Barbell",
    instructions: "Bend at hips and knees, lift barbell keeping back straight",
  },
  {
    id: "ex4",
    name: "Overhead Press",
    targetMuscle: "Shoulders",
    equipment: "Barbell",
    instructions: "Press barbell overhead from shoulder height",
  },
  {
    id: "ex5",
    name: "Barbell Row",
    targetMuscle: "Back",
    equipment: "Barbell",
    instructions: "Bend over, pull barbell to lower chest",
  },
  {
    id: "ex6",
    name: "Pull-ups",
    targetMuscle: "Back",
    equipment: "Pull-up Bar",
    instructions: "Hang from bar, pull body up until chin over bar",
  },
  {
    id: "ex7",
    name: "Dips",
    targetMuscle: "Triceps",
    equipment: "Dip Station",
    instructions: "Lower body between parallel bars, push back up",
  },
  {
    id: "ex8",
    name: "Incline Dumbbell Press",
    targetMuscle: "Chest",
    equipment: "Dumbbells",
    instructions: "Press dumbbells up from inclined bench",
  },
  {
    id: "ex9",
    name: "Lateral Raises",
    targetMuscle: "Shoulders",
    equipment: "Dumbbells",
    instructions: "Raise dumbbells to sides until parallel to floor",
  },
  {
    id: "ex10",
    name: "Bulgarian Split Squats",
    targetMuscle: "Legs",
    equipment: "Dumbbells",
    instructions: "Single leg squat with rear foot elevated",
  },
]

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

const getExerciseById = (id: string) => exercises.find((ex) => ex.id === id)

  const getMuscleColor = (muscle: string) => {
    const colors: Record<string, string> = {
      Chest: "bg-catppuccin-red text-catppuccin-base",
      Back: "bg-catppuccin-blue text-catppuccin-base",
      Shoulders: "bg-catppuccin-peach text-catppuccin-base",
      Legs: "bg-catppuccin-green text-catppuccin-base",
      Arms: "bg-catppuccin-mauve text-catppuccin-base",
      Triceps: "bg-catppuccin-lavender text-catppuccin-base",
    }
    return colors[muscle] || "bg-catppuccin-surface0 text-catppuccin-subtext0"
  }

	return (
		<PageContainer title="Gym">

    <div className="min-h-screen bg-white dark:bg-catppuccin-base">
      <div className="sticky top-0 z-10 bg-white dark:bg-catppuccin-base border-b border-gray-200 dark:border-catppuccin-surface0 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-catppuccin-text">{programId}</h1>
              <p className="text-gray-600 dark:text-catppuccin-subtext0">TODO program description</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {data?.map((workout) => (
            <Card
              key={workout.id}
              className="bg-white dark:bg-catppuccin-mantle border-gray-200 dark:border-catppuccin-surface0"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-gray-900 dark:text-catppuccin-text">{workout.name}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-catppuccin-subtext0 mt-1">{workout.description}</p>
                  </div>
                  <Button
                    className="bg-catppuccin-green hover:bg-catppuccin-teal text-catppuccin-base"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-catppuccin-subtext0">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {workout.estimatedDuration} min
                  </div>
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    {workout.exercises.length} exercises
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {workout.exercises.map((workoutEx, index) => {
                    const exercise = getExerciseById(workoutEx.exerciseId)
                    if (!exercise) return null

                    return (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-catppuccin-surface0 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-catppuccin-text text-sm">
                            {exercise.name}
                          </h4>
                          <Badge className={getMuscleColor(exercise.targetMuscle)}>{exercise.targetMuscle}</Badge>
                        </div>

                        <div className="text-xs text-gray-600 dark:text-catppuccin-subtext0 space-y-1">
                          <div className="flex justify-between">
                            <span>Sets × Reps:</span>
                            <span className="font-medium">
                              {workoutEx.sets} × {workoutEx.reps}
                            </span>
                          </div>
                          {workoutEx.weight && (
                            <div className="flex justify-between">
                              <span>Weight:</span>
                              <span className="font-medium">{workoutEx.weight}</span>
                            </div>
                          )}
                          {workoutEx.restTime && (
                            <div className="flex justify-between">
                              <span>Rest:</span>
                              <span className="font-medium">{workoutEx.restTime}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
</PageContainer>
  )
}
