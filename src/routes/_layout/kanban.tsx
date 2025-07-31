import { PageContainer } from "@/components/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/kanban")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageContainer title="Kanban"></PageContainer>;
}
