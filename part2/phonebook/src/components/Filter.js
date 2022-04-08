import React from 'react'

const Filter = ({search, onSearch}) => {
  return (
    <div>
      Search: <input value={search} onChange={onSearch} />
    </div>
  )
}

export default Filter