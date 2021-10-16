export default (req, res) => {
	res.status(200).send(process.env.spotify_client_id);
};
