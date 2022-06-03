import React from 'react'
type RequiredProp = {
  msg: string
}
const Required = ({ msg }: RequiredProp) => {
  return (
    <span><span>{msg}</span><span className="text-[#ff4500] text-xl p-2.5" >*</span></span>
  )
}

export default Required