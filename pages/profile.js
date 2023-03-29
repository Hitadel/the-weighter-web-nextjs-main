import CommonLayout from "../components/layout/CommonLayout"
import Background from "../components/profile/background"
import LeftSide from "../components/profile/left-side"
import RightSide from "../components/profile/right-side"

const Profile = () => {
  const data = false

  return (
    <CommonLayout>
      <Background>
        {data ? (
          <>
            <LeftSide />
            <RightSide />
          </>
        ) : (
          <div
            className='flex items-center justify-center
          text-black text-2xl font-bold'
          >
            허용되지 않은 접근입니다.
          </div>
        )}
      </Background>
    </CommonLayout>
  )
}

export default Profile
