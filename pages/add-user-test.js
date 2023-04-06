//import { loadEnvConfig } from "@next/env";

export default function addUser() {
    // const projectDir = process.cwd()
    // loadEnvConfig(projectDir)


    // const access_token = async () => {
    //     try {
    //         const response = await fetch("https://dev-w205xag6.us.auth0.com/oauth/token", {
    //             method: "POST",
    //             headers: {'content-type': 'application/x-www-form-urlencoded'},
    //             body: new URLSearchParams({
    //                 grant_type: 'client_credentials',
    //                 client_id: 'z1weXvpUnKoYjnE6OZzTbRLGQjSwQHmJ',
    //                 client_secret: 'FKa0fF8JgK-x92twEK-cj3SYSW36VHASCSZ-binkKvejDdedVb1qeolw_Cmr18dW',
    //                 audience: "https://dev-w205xag6.us.auth0.com/api/v2/"
    //             }),
    //         });

    //         const data = await response.json()
    //         console.log(data)
    //     }
    //     catch (err) {
    //         console.log("Error: " + err)
    //     }
    // }

    // let res = access_token();

    const access_token = async () => {
        response = await fetch("/api/createUser")
        data = await response
    }

    let res = access_token()

    return(null);
}