import React from 'react'

export const Dashboard = () => {
  return (
    <div>
        <div className='flex items-center justify-between p-2'>
            <div>
                <p>Good to see you,</p>
                <p className='text-2xl font-bold'>user.name</p>
            </div>
            <div>
                <p>history icon</p>
                <p>profile icon</p>
            </div>
        </div>
    </div>
  )
}

export default Dashboard