//import { loadEnvConfig } from "@next/env";
// pages/api/products.js

export default function addUser() {
    // const projectDir = process.cwd()
    // loadEnvConfig(projectDir)

    const handleClick = async () => {
        const response = await fetch('https://dev-w205xag6.us.auth0.com/oauth/token', {
            method: "post",
            mode: "cors",
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                client_id: "Gbpu7QwNyDaBaOCVVpsoxOGN8PWrMP0J",
                client_secret: "o7-JP2-Vt6WQpYG4cAKPuzASg2y6giwBSUXTcCMNrlQC1sAiwnP6tsm14bg0Kb97",
                audience: "https://dev-w205xag6.us.auth0.com/api/v2/",
                grant_type: "client_credentials"
            }),
        })

        const data = await response.json()
        const token = data.access_token
        console.log(token)
    }


    // const access_token = async () => {
    //     try {
    //         const response = await fetch("https://dev-w205xag6.us.auth0.com/oauth/token", {
    //             method: "POST",
    //             headers: {'content-type': 'application/x-www-form-urlencoded'},
    //             body: new URLSearchParams({
    //                 grant_type: 'client_credentials',
    //                 client_id: 'Gbpu7QwNyDaBaOCVVpsoxOGN8PWrMP0J',
    //                 client_secret: 'o7-JP2-Vt6WQpYG4cAKPuzASg2y6giwBSUXTcCMNrlQC1sAiwnP6tsm14bg0Kb97',
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
        console.log("here")
        const response = await fetch("/api/createUser")
        console.log(response)
    }

    return(
        <button onClick={handleClick}>Clicky</button>
    );
}