import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// export const Api = {
//   getUsuarios() {
//     return api.get('/usuarios');
//   },
// };
export type guestType = {
  name: string;
  attending: boolean;
  notes: string | null;
};

type guestResponseType = {
  phone: string;
  guests: guestType[];
};

export const getGuestInfo = async (
  phone: string
): Promise<guestResponseType> => {
  try {
    const response = await axios.get(`${BASE_URL}/rsvp/${phone}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching guest info', error);
    throw error;
  }
};

type submitRSVPType = {
  phone: string;
  guests: guestType[];
  message: string;
};

export const submitRSVP = async (rsvpData: submitRSVPType) => {
  try {
    const response = await axios.post(`${BASE_URL}/rsvp/confirm`, rsvpData);
    return response.data;
  } catch (error) {
    console.error('Error submitting RSVP', error);
    throw error;
  }
};
