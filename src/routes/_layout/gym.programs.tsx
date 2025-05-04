import { PageContainer } from "@/components/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/gym/programs")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageContainer title="Gym programs"></PageContainer>;
}
