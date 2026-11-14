import { requireMember } from "@/lib/auth/session";
import { getProjectById } from "@/features/projects/queries";
import { ProjectBoardView } from "@/features/projects/components/project-board-view";
import { notFound } from "next/navigation";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ orgSlug: string; id: string }>;
}) {
  const { orgSlug, id } = await params;
  const { org } = await requireMember(orgSlug);

  const project = await getProjectById(org.id, id);
  if (!project) notFound();

  return <ProjectBoardView project={project} />;
}
