import CheckUser  from '../auth0CheckUser';

export default function Home()
{
    if(!CheckUser()) return(<div>Redirecting...</div>);

    return(
        <body>
           It's where you want to be :)
        </body>
    );
};