import React from 'react'
type TitleProps={
    msg:string 
    id:string
    edit:boolean
}
export const title=(msg:string ,id:string,edit:boolean )=>{
  return id==""?"nouveau "+msg:(id!=""&&edit)?"detail "+msg:"modification "+msg
}
export const titleFm=(msg:string ,id:string,edit:boolean )=>{
  return id==""?"nouvelle "+msg:id!=""&&edit?"detail "+msg:"modification "+msg
}
const Title = ({msg,id,edit}:TitleProps) => {
    
  return (
    <>
    
    <h1 className="capitalize mb-2">{title(msg,id,edit)}</h1>
    <hr className="my-2" />
    </>
  )
}

export default Title