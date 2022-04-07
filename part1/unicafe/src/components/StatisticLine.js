import React from 'react'

const StatisticLine = ({ value, text}) => {
    return (
        <tbody>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </tbody>
    )
}

export default StatisticLine
