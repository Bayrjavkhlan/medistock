import EquipmentDetailContainer from "./container/equipment-detail.container";

export default async function EquipmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EquipmentDetailContainer id={id} />;
}
