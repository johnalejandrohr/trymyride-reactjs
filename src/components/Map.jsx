import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import { useSelector } from 'react-redux';

const Map = ({center}) => {
    const places = useSelector((state) => state.places)
  return (
    <>
    <p>{center}</p>
      <MapContainer
        center={center || [4.7193005, -74.0572233]}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places.places.map((position, index) => {
          return (
            <Marker key={index} position={position}>
              <Popup>
                {position.name}
                <br />
                lat: {position.lat} lon:{position.lon}
              </Popup>
            </Marker>
          );
        })}        
      </MapContainer>
    </>
  );
};

export default Map;
