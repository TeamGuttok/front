export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>
}) {
  const { q } = await searchParams

  return (
    <>
      <div>item 페이지: {q}</div>
    </>
  )
}
