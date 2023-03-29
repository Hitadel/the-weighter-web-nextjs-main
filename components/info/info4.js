import { useState } from "react"
import useInterval from "../../utils/useInterval"

const Info4 = () => {
  const [menu, setMenu] = useState("")
  const [text, setText] = useState("")
  const [compo, setCompo] = useState([""])
  const [landingTitle, setLandingTitle] = useState("")
  const [count, setCount] = useState(0)

  // 받아올 데이터
  const arr = [
    {
      menu: "국내 건강체력 기준",
      text: "국내 건강 체력기준은 현재 @@@@ 이며 다음과 같습니다.",
      compo: [],
    },
    { menu: "경찰 공무원", text: "경찰 공무원 필수 자격은 @@@@ 이며 다음과 같습니다.", compo: ["1", "2", "3"] },
    { menu: "소방 공무원", text: "소방 공무원 필수 자격은 @@@@ 이며 다음과 같습니다.", compo: [] },
    { menu: "테스트", text: "overflow test / ".repeat(200), compo: [] },
  ]

  // 타이핑 효과
  useInterval(() => {
    if (count >= text.length) {
      return
    }

    setLandingTitle((prev) => {
      let result = prev ? prev + text[count] : text[0]

      setCount((prev) => prev + 1)

      return result
    })
  }, 1)

  const onClickHandler = (v) => {
    setLandingTitle("")
    setCount(0)
    setText(v.text)
    setMenu(v.menu)
    setCompo(v.compo)
  }

  return (
    <div className='flex w-[60%] h-[80%] text-black drop-shadow'>
      {/*좌측*/}
      <ul className='tabs flex flex-col w-[50vh] h-full items-center justify-between bg-white rounded-l-lg text-white text-lg font-bold'>
        {arr.map((v, idx) => {
          return (
            <li
              className='flex w-[90%] h-full items-center justify-center bg-button my-5 rounded-lg cursor-pointer hover:bg-hover active:bg-button focus:ring focus:ring-4 focus:ring-gray-500 '
              key={idx}
              onClick={() => {
                onClickHandler(v)
              }}
            >
              {v.menu}
            </li>
          )
        })}
      </ul>
      {/* 우측 */}
      <div className='flex flex-col w-full h-full p-10 bg-gray-300 rounded-r-lg text-xl font-bold overflow-auto'>
        {menu ? <div className='flex w-[15vw] h-[3vw] items-center justify-center rounded-lg drop-shadow text-3xl bg-white mb-10'>{menu}</div> : <div className='flex items-center justify-center'>메뉴를 눌러 확인해 보세요.</div>}
        <div className='mb-10'>{landingTitle}</div>

        {compo.map((v, idx) => {
          return (
            <div key={idx} className='my-2'>
              {v}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Info4
