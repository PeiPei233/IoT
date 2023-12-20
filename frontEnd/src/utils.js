import axios from 'axios';

export async function reGeoCode(lng, lat) {
  const url = 'https://restapi.amap.com/v3/geocode/regeo?output=json&location='
    + lng + ',' + lat + '&key=' + import.meta.env.VITE_AMAP_KEY + '&radius=1000&extensions=all';
  const response = await axios.get(url);
  return response.data.regeocode.formatted_address;
}