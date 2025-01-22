export default async function GroupEdit({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const groupId = (await params).id
  
  return <div>{groupId}</div>
}
