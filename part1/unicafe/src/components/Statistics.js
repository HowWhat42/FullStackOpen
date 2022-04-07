import React from 'react'
import { StatisticLine } from '../components'

const Statistics = ({all, good, neutral, bad, total}) => {
    return (
        <div>
            <h2>Statistics</h2>
            {all === 0 ? 
                <p>No feedback given</p> : 
                <table>
                    <StatisticLine value={good} text="Good" />
                    <StatisticLine value={neutral} text="Neutral" />
                    <StatisticLine value={bad} text="Bad" />
                    <StatisticLine value={all} text="All" />
                    <StatisticLine value={total/all} text="Average" />
                    <StatisticLine value={`${good/all*100}%`} text="Positive" />
                </table>
            }
        </div>
    )
}

export default Statistics
