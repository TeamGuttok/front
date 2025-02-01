import MyPageEditForm from '#app/settings/edit/MyPageEditForm'
import { UserDetail } from '#types/user'

function getInitialData(): UserDetail {
  return {
    id: 1,
    email: 'email@example.com',
    nickName: 'guttok',
    alarm: true,
  }
}

export default function MyPageEdit() {
  const initialData = getInitialData()

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-full mt-5">
        <h2 className="text-xl sm:text-3xl font-bold">마이페이지 수정</h2>
      </div>
      <div className="w-full h-[1px] bg-border mt-5"></div>

      <MyPageEditForm initialData={initialData} />
    </div>
  )
}
