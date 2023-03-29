import CommonLayout from "../components/layout/CommonLayout"
import LeftSide from "../components/foodTable/left-side"
import RightSide from "../components/foodTable/right-side"
import Background from "../components/foodTable/background"

const FoodTable = () => {
  return (
    <CommonLayout>
      <Background>
        <LeftSide />
        <RightSide />
      </Background>
    </CommonLayout>
  )
}

export default FoodTable
