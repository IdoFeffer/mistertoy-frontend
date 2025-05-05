import { useRef, useState } from "react"
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Marker,
  Pin,
  useAdvancedMarkerRef,
  useMap,
} from "@vis.gl/react-google-maps"

const API_KEY = "AIzaSyAtjY7qqURWeVt6QT1dS50rcXVVPumesus"

export function GoogleMap() {
    
  const [coords, setCoords] = useState({
    lat: 32.0853,
    lng: 34.7818,
  })
  const zoom = 11
  const [markerRef, marker] = useAdvancedMarkerRef()
  const branches = [
    { name: "Tel Aviv", lat: 32.0853, lng: 34.7818 },
    { name: "Haifa", lat: 32.794, lng: 34.9896 },
    { name: "Jerusalem", lat: 31.7683, lng: 35.2137 },
    { name: "New York", lat: 40.7128, lng: -74.006 },
    { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  ]

  const map = useMap()

  function onMapClick(ev) {
    const newCoords = ev.detail.latLng
    setCoords(newCoords)
    ev.map.panTo(newCoords)
  }

  function onCenter(ev) {
    const startCoords = {
      lat: 32.0853,
      lng: 34.7818,
    }
    map.panTo(startCoords)
    setCoords(startCoords)
  }

  const style = { width: "100%", height: "70vh" }
  return (
    <section style={style} className="google-map">
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultZoom={zoom}
          mapId="main-map"
          defaultCenter={coords}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          onClick={onMapClick}
        >
          {/* <Marker position={coords} /> */}
          {/* <InfoWindow anchor={marker}>
                        The content of the info window is here❗️
                    </InfoWindow> */}
          {branches.map((branch) => (
            <button key={branch.name} onClick={() => onCenter(branch)}>
              {branch.name}
            </button>
          ))}

          <AdvancedMarker ref={markerRef} position={coords}>
            {/* <Pin background={'dodgerblue'} glyphColor={'hotpink'} borderColor={'black'} /> */}
            <div style={{ fontSize: "30px" }}>👆</div>
          </AdvancedMarker>
        </Map>
      </APIProvider>

      <button onClick={onCenter}>Center</button>
    </section>
  )
}
