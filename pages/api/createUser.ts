import { getAccessToken, withAPIAuthRequired } from '@auth0/nextjs-auth0';

export default withAPIAuthRequired(
    async function createUser(req, res) {
        // If your access token is expired and you have a refresh token
        // `getAccessToken` will fetch you a new one using the `refresh_token` grant

        console.log("HEre")

        const { accessToken } = await getAccessToken(req, res, {
            scopes: ['read:users', 'update:users', 'delete:users', 'create:users']
        });
        // const response = await fetch('https://api.example.com/products', {
        // headers: {
        //     Authorization: `Bearer ${accessToken}`
        // }
        // });
        // const products = await response.json();
        // res.status(200).json(products);
        console.log(accessToken)
        res.status(200).json({"sup": "hi"})
    }
);