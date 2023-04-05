import { useState } from "react"
import useInterval from "../../utils/useInterval"
import Image from "next/image"
import img1 from "../../public/info4.png"
import img2 from "../../public/info5.png"

const Info4 = () => {
  const [id, setId] = useState(undefined)
  const [menu, setMenu] = useState("")
  const [text, setText] = useState("")
  const [compo, setCompo] = useState([""])
  const [landingTitle, setLandingTitle] = useState("")
  const [count, setCount] = useState(0)

  // 받아올 데이터
  const list = [
    { id: 0, menu: "평가 기준", text: "국내 남녀 각 운동의 건강 체력기준은 다음과 같습니다.", compo: [] },
    { id: 1, menu: "소방 공무원", text: "소방 공무원 시험 기준은 다음과 같습니다.", compo: [] },
    { id: 2, menu: "경찰 공무원", text: "경찰 공무원 필수 자격은 다음과 같습니다.", compo: ["내용1", "내용2", "내용3"] },
    { id: 3, menu: "테스트", text: "overflow test / ".repeat(200), compo: [] },
    { id: 4, menu: "테스트", text: "overflow test / ".repeat(200), compo: [] },
    { id: 5, menu: "테스트", text: "overflow test / ".repeat(200), compo: [] },
  ]

  setdata변수

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
  }, 15)

  const onClickHandler = (v) => {
    setLandingTitle("")
    setCount(0)
    setId(v.id)
    setMenu(v.menu)
    setText(v.text)
    setCompo(v.compo)

    console.log(v)
    console.log(v.compo)
  }

  return (
    <div className='flex w-[70%] h-[80%] text-black drop-shadow'>
      {/*좌측*/}
      <ul className='tabs flex flex-col w-[50vh] h-full items-center justify-between bg-white rounded-l-lg text-white text-lg font-bold'>
        {list.map((v, idx) => {
          return (
            <li
              className='flex w-[90%] h-full items-center justify-center bg-button my-5 rounded-lg cursor-pointer hover:bg-hover active:bg-button'
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
      <div className='relative w-full h-full p-10 bg-gray-300 rounded-r-lg text-xl font-bold overflow-auto'>
        {menu ? <div className='flex w-[15vw] h-[3vw] items-center justify-center rounded-lg drop-shadow text-3xl  bg-white mb-10'>{menu}</div> : <div className='flex items-center justify-center'>메뉴를 눌러 확인해 보세요.</div>}
        <div className='mb-10'>{landingTitle}</div>
        {id == 0 ? <Image src={img1} alt='info4' /> : id == 1 ? <Image src={img2} alt='info5' /> : <></>}
        {/* 추가 기능  */}
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
