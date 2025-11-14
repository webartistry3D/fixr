import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet default icon issue
const defaultIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

export default function HandymanMap({
  coords
}: {
  coords: { lat: number; lng: number } | null;
}) {
  return (
    <MapContainer
      center={coords || { lat: 6.5244, lng: 3.3792 }} // Lagos fallback
      zoom={coords ? 15 : 11}
      scrollWheelZoom={true}
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {coords && (
        <Marker position={coords}>
          <Popup>Selected Address</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
