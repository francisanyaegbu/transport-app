import Navbar from '../../../app/components/Navbar'
import MapPlaceholder from '../../../app/components/MapPlaceholder'
import RideDetails from '../../../app/components/RideDetails'

type Props = { params: { id: string } }

export default function RidePage({ params }: Props) {
  return (
    <>
      <Navbar />
      <main style={{ padding: 16 }}>
        <h1>Ride details</h1>
        <div style={{ height: 240, margin: '12px 0' }}>
          <MapPlaceholder />
        </div>
        <RideDetails riderId={params.id} />
      </main>
    </>
  )
}
