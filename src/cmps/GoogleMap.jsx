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
// const API_KEY = ""

export const toyStores = [
  {
    name: "כפר השעשועים תל אביב",
    address: "דרך מנחם בגין 132, תל אביב",
    lat: 32.0741,
    lng: 34.7922,
  },
  {
    name: "עולם הצעצועים",
    address: "רחוב ההסתדרות 40, חיפה",
    lat: 32.805,
    lng: 35.0645,
  },
  {
    name: "ToyLand ראשון לציון",
    address: "שדרות לוי אשכול 103, ראשון לציון",
    lat: 31.9823,
    lng: 34.7754,
  },
  {
    name: "צעצועי מור",
    address: "רחוב ירושלים 17, אשדוד",
    lat: 31.7928,
    lng: 34.6493,
  },
  {
    name: "צעצועי הדובי",
    address: "הברוש 12, באר שבע",
    lat: 31.2542,
    lng: 34.799,
  },
  {
    name: "טויס אר אס נתניה",
    address: "רחוב פתח תקווה 12, נתניה",
    lat: 32.3225,
    lng: 34.8572,
  },
  {
    name: "אצל יניב",
    address: "הצנחנים 3, פתח תקווה",
    lat: 32.0874,
    lng: 34.8872,
  },
  {
    name: "עידן הצעצועים",
    address: "אבן גבירול 90, תל אביב",
    lat: 32.0793,
    lng: 34.7811,
  },
  {
    name: "טויס פלוס",
    address: "הנגר 4, כפר סבא",
    lat: 32.1766,
    lng: 34.9135,
  },
  {
    name: "צעצועי יוסי",
    address: "דרך שלמה 99, תל אביב",
    lat: 32.0531,
    lng: 34.7693,
  },
]

export function GoogleMap() {
  const [markerRef, marker] = useAdvancedMarkerRef()
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [coords, setCoords] = useState({
    lat: 32.0853,
    lng: 34.7818,
  })

  const zoom = 11
  const style = { width: "100%", height: "70vh" }

  function onMapClick(ev) {
    const newCoords = ev.detail.latLng
    setCoords(newCoords)
    ev.map.panTo(newCoords)
  }

  function MapContent() {
    const map = useMap()

    function onCenter(place) {
      if (!map) return
      const newCoords = { lat: place.lat, lng: place.lng }
      setCoords(newCoords)
      map.panTo(newCoords)
    }

    function onPlaceClick(place) {
      setCoords({ lat: place.lat, lng: place.lng })
      setSelectedPlace(place)
      map.panTo({ lat: place.lat, lng: place.lng })
    }

    return (
      <>
        {toyStores.map((place) => (
          <AdvancedMarker
            key={place.name}
            position={{ lat: place.lat, lng: place.lng }}
            onClick={() => onPlaceClick(place)}
          >
            <Pin background="blue" borderColor="green" glyphColor="red" />
            {selectedPlace?.name === place.name && (
              <InfoWindow
                position={{ lat: place.lat, lng: place.lng }}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <h2>{place.name}</h2>
                <p style={{ color: "black" }}>{place.address}</p>
              </InfoWindow>
            )}
          </AdvancedMarker>
        ))}

        <div className="map-buttons">
          {toyStores.map((store) => (
            <button key={store.name} onClick={() => onCenter(store)}>
              {store.name}
            </button>
          ))}
        </div>
      </>
    )
  }

  return (
    <section style={style} className="google-map">
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultZoom={zoom}
          mapId="main-map"
          defaultCenter={coords}
          gestureHandling="greedy"
          disableDefaultUI={true}
          onClick={onMapClick}
        >
          <MapContent />
        </Map>
      </APIProvider>
    </section>
  )
}
