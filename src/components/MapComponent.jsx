/* eslint-disable react/prop-types */
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '50%',
    height: '400px'
};

const center = {
    lat: -3.745, // Default latitude
    lng: -38.523 // Default longitude
};

const MapComponent = ({ latitude, longitude }) => {
    const mapCenter = {
        lat: latitude || center.lat,
        lng: longitude || center.lng
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyDfq88y-1kZCmIQ8vVPgLeq3kUZmy7T23k">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={10}
            >
                {console.log("hello")}
                <Marker position={mapCenter} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
