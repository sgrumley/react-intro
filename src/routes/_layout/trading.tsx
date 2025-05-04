import { PageContainer } from "@/components/PageContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/trading")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageContainer title="Trading"></PageContainer>;
}
