import { APIProvider } from "@vis.gl/react-google-maps"
import { GoogleMap } from "./GoogleMap"

const API_KEY = "AIzaSyAtjqqURWeVt6QT1dS50rcXVVPumesus"
// const API_KEY = ""

export function MyMap() {
  return (
    <div className="google-map">
      <APIProvider apiKey={API_KEY}>
        <GoogleMap />
      </APIProvider>
    </div>
  )
}
