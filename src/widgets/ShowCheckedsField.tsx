import React, { ChangeEvent, ReactNode, useState } from 'react'
type ShowCheckedsFieldProps = {
  children: ReactNode;
  msg: string
  isAdd: boolean
}
const ShowCheckedsField = ({ children, msg, isAdd }: ShowCheckedsFieldProps) => {
  const [show, setShow] = useState(false)
  const prefix: string = isAdd ? "Entrer " : ""
  return (
    <>
      <div className="ml-8 my-2 relative flex items-start">
        {isAdd && <div className="flex items-center h-5">
          <input id="offers" aria-describedby="offers-description" name="offers" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setShow(e.target.checked)
            }}
          />
        </div>}
        <div className="ml-3 text-sm">
          <label className="font-medium text-gray-700">{prefix + msg}</label>
        </div>
      </div>
      {(show || !isAdd) && children}
    </>
  )
}

export default ShowCheckedsField