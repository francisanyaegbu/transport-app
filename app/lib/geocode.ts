export async function geocodeAddress(address: string): Promise<[number, number] | null> {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN
  if (!token) return null
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}&limit=1`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    if (!data.features || data.features.length === 0) return null
    const [lng, lat] = data.features[0].center
    return [lat, lng]
  } catch (e) {
    console.error('geocode error', e)
    return null
  }
}
