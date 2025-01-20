export default async function GroupItem({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const groupId = (await params).id
  return <div>My Post: {groupId}</div>
}
