export default async function GroupMemberEdit({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const groupId = (await params).id

  return <div>{groupId}</div>
}
