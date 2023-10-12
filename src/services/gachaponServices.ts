import axios from 'axios';
import { environment } from 'src/environments/environment';

const baseUrl = environment?.production
  ? 'http://localhost:5000/gacha' //prod url idk what it is yet
  : 'http://localhost:5000/gacha';

/* Grabs List of Unique Items with their rates in the form of
 * [{itemName: string, rates: number},]
 */
const getGachaListObjects = (gachaName: string) => {
  const request = axios.get(`${baseUrl}/object/${gachaName}`);
  return request.then((response) => response.data);
};

// Grabs List of Unique Items
const getListOfItemsFromGacha = (gachaName: string) => {
  const request = axios.get(`${baseUrl}/${gachaName}`);
  return request.then((response) => response.data);
};

// Grabs the Pool of Items in the Gachapon
const getPoolListFromGacha = (gachaName: string) => {
  const request = axios.get(`${baseUrl}/pool/${gachaName}`);
  return request.then((response) => response.data);
};
export default {
  getListOfItemsFromGacha,
  getPoolListFromGacha,
  getGachaListObjects,
};
