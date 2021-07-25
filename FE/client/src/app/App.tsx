import { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../assets/css/custom.css'
import meninggal from "../assets/images/meninggal.png";
import positif from "../assets/images/positif.png";
import sembuh from "../assets/images/sembuh.png";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

interface IDataMarker {
  dataCurrent: {
    meninggal: any,
    positif: any,
    sembuh: any,
    provinsi: any
  },
  longlat: {long: any, lat: any}
}

function App() {
  const [listMarker, setlistMarker] = useState<any[]>()
  const [totalMati, settotalMati] = useState()
  const [totalPositif, settotalPositif] = useState()
  const [totalSembuh, settotalSembuh] = useState()


  useEffect(() => {
    fetchData()
    return () => {
      fetchData()
    }
  }, [])

  useEffect(() => {
    console.log(listMarker)
  }, [listMarker])

  const fetchData = async () => {
    const response = await axios.get(
      'http://localhost:5000/covidDatas',
    );

    settotalMati(response.data.totalDeath)
    settotalPositif(response.data.totalPositif)
    settotalSembuh(response.data.totalRecover)

    const newObj: IDataMarker[] = []

    response.data.features.map((item: any) => {
      if (item.attributes.Provinsi !== ' Indonesia') {
        newObj.push({
          dataCurrent: {
            meninggal: item.attributes.Kasus_Meni,
            positif: item.attributes.Kasus_Posi,
            sembuh: item.attributes.Kasus_Semb,
            provinsi: item.attributes.Provinsi
          },
          longlat: {long: item.geometry.x, lat: item.geometry.y}
        })
      }
    })

    // console.log(newObj)

    setlistMarker(newObj)
  };

  function formatNumber(value: any) {
    return new Intl.NumberFormat('id-ID').format(value)
  }
  
  return (
    <div className="App h-10">
      <div 
        className="absolute top-2 right-2 
          sm:flex-row 
          xs:flex 
          xs:flex-col 
          flex
          gap-1" 
        style={{zIndex: 401}}
      >
        <div className="flex flex-col items-center bg-red-400 shadow-md p-4 rounded-md">
          <div className="text-white capitalize">total kematian</div>
          <div className="text-white text-xl font-bold">{formatNumber(totalMati)}</div>
        </div>
        <div className="flex flex-col items-center bg-yellow-500 shadow-md p-4 rounded-md">
          <div className="text-white capitalize">total positif</div>
          <div className="text-white text-xl font-bold">{formatNumber(totalPositif)}</div>
        </div>
        <div className="flex flex-col items-center bg-green-500 shadow-md p-4 rounded-md">
          <div className="text-white capitalize">total positif</div>
          <div className="text-white text-xl font-bold">{formatNumber(totalSembuh)}</div>
        </div>
      </div>

      <MapContainer center={[-0.197, 121.157]} zoom={5} scrollWheelZoom={true}
        className="w-screen h-screen"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          listMarker?.map((marker: IDataMarker, index: number) => {
            return(
              <Marker position={[marker.longlat.lat, marker.longlat.long]} key={`key list-marker-${index}`}>
                <Popup maxWidth={200}>
                  <div className="text-lg font-bold text-center">
                    {marker.dataCurrent.provinsi}
                  </div>
                  <hr className="mb-4"/>
                  <div className="flex flex-col">
                    <div className="flex justify-start mb-3 items-center">
                      <img src={meninggal} alt="" className="w-10 h-10 object-cover"/>
                      <span className="ml-2 text-sm font-bold">{formatNumber(marker.dataCurrent.meninggal)} meninggal</span>
                    </div>
                    <div className="flex justify-start mb-3 items-center">
                      <img src={positif} alt="" className="w-10 h-10 object-cover"/>
                      <span className="ml-2 text-sm font-bold">{formatNumber(marker.dataCurrent.positif)} positif</span>
                    </div>
                    <div className="flex justify-start mb-3 items-center">
                      <img src={sembuh} alt="" className="w-10 h-10 object-cover"/>
                      <span className="ml-2 text-sm font-bold">{formatNumber(marker.dataCurrent.sembuh)} sembuh</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            )
          })
        }
      </MapContainer>
    </div>
  );
}

export default App;