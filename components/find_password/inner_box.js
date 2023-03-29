import { useState, useEffect } from "react"

import Image from "next/image"
import leftImage from "../../public/leftImage.png"
import FindPassword from "./find_password"
import FoundPassword from "./found_password"

const InnerBox = () => {
  const [correct, setCorrect] = useState(false)

  const getCorrect = () => {
    setCorrect(true)
  }

  return (
    <div className='flex w-[55%] h-5/6 bg-white shadow-shadow justify-center items-center rounded-3xl'>
      <Image src={leftImage} alt='leftImage' />
      {correct ? <FoundPassword /> : <FindPassword getCorrect={getCorrect} />}
    </div>
  )
}

export default InnerBox
