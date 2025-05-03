import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/gym/programs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/gym/programs"!</div>
}
