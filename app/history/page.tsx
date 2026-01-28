import Navbar from '../../app/components/Navbar'

export default function HistoryPage() {
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <>
      <Navbar />
      <main className='mt-20 px-5 '>
        <h1 className='text-xl text-center mb-5'>Ride History</h1>
        <div className='history-time flex items-center justify-between mb-5 border rounded-md border-gray-300 w-full'>
          {/* map through ride history */}
          <p>1W</p>
          <p>1M</p>
          <p>3M</p>
          <p>6M</p>
        </div>
        <div>
          {/* Display the current date being shown */}
          <p className='text-lg font-semibold mb-4'>{formattedDate}</p>
          
          {/* Map through rides for the selected date and display each ride card */}
          <div className='flex items-center justify-between rounded-md p-2 shadow-md shadow-gray-200'>
            <div className='text-sm'>
              {/* Rider's profile picture and name - this will link to rider's profile */}
              <p>Rider Name</p>
              {/* Display pickup location and destination */}
              <p>Destination</p>
              {/* Display ride time */}
              <p>Time</p>
            </div>
            <div>
              {/* Display the ride fare amount */}
              <p>Price</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
