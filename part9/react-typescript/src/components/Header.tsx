import React from 'react'

type Props = {
    courseName: string
}

const Header = (props: Props) => {
  return (
    <div>
        <h1>{props.courseName}</h1>
    </div>
  )
}

export default Header