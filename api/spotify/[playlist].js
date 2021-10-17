import fetch from 'node-fetch';
import { base64encode } from 'nodejs-base64';

const baseUrl = `https://accounts.spotify.com`;
const authUrl = `${baseUrl}/api/token`;

const apiUrl = `https://api.spotify.com`;
const playlistUrl = (id) => `${apiUrl}/v1/playlists/${id}`;

const encodeLogin = (clientId, clientSecret) => base64encode(`${clientId}:${clientSecret}`);

const encodeFormParams = (params) =>
	Object.keys(params)
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
		.join('&');

export const authenticate = async (clientId, clientSecret) => {
	const params = {
		grant_type: 'client_credentials'
	};

	const response = await fetch(authUrl, {
		method: 'POST',
		body: encodeFormParams(params),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${encodeLogin(clientId, clientSecret)}`
		}
	});

	return (await response.json())['access_token'];
};

export const playlist = async (token, playlist) => {
	const response = await fetch(playlistUrl(playlist), {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	return await response.json();
};

export default async (req, res) => {
	const token = await authenticate(
		process.env.spotify_client_id,
		process.env.spotify_client_secret
	);

	res.send(await playlist(token, req.query.playlist));
};
