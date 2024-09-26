import axios from 'axios';

// Function to get OAuth access token using Client ID and Client Secret
const getAccessToken = async () => {
    const url = 'https://zoom.us/oauth/token';
    const clientId = '2syPsDWgSw2NLk4rT9kI7A'; // Replace with your actual Client ID
    const clientSecret = 'G28nQ8s6A7ILprxrgATdFePEmv1sfI8E'; // Replace with your actual Client Secret

    // Base64 encoding for the authentication header
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
        const response = await axios.post(url, null, {
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
                grant_type: 'client_credentials'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
    }
};

// Function to get meeting participants
export const getMeetingParticipants = async (meetingId) => {
     const accessToken = await getAccessToken();
     const url = `https://api.zoom.us/v2/meetings/${meetingId}/participants`;
 
     try {
         const response = await axios.get(url, {
             headers: {
                 'Authorization': `Bearer ${accessToken}`
             }
         });
         console.log('Participants response:', response.data); // Add this line to check the response
         return response.data.participants;
     } catch (error) {
         console.error('Error fetching participants:', error);
         return []; // Return an empty array in case of error
     }
 };
 