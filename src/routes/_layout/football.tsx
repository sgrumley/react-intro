import { PageContainer } from "@/components/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/football")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageContainer title="Football"></PageContainer>;
}
