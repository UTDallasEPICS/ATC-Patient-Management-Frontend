import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

/*
    Explaination:
        This function SHOULD be implemented within every route except the initial '/' route.
        It checks the see if a user is logged in, otherwise it redirects them to the initial 
        ('login') page. Also checks to see if the user is the correct role otherwise they are
        redirected to the login page.
    Parameter:
        usersAllowed is a string array of user roles that are allowed. Example:
            ["Student", "Technician", "Admin"]
    Returns:
        True if the user is signed in and has the correct permissions, otherwise false.
    Implementation:
        if(!CheckUser(["Admin"])) return(<div>Redirecting...</div>);
*/
export default function CheckUser(usersAllowed?: String[]) {
    const { user, error, isLoading } = useUser();
    const router = useRouter();

    if (isLoading) return <div>Loading...</div>;

    if (error) return(<div>{error.message}</div>);

    if (!user) {
        // router.prefetch('/'); Might not need
        router.push('/api/auth/login?returnTo=/');
        return(false);
    }

    if(typeof usersAllowed == "object")
        console.log(usersAllowed.join(" "))

    /*
        ------------------------------------------------------------------------------
        INSERT CODE that connects to database and gets user's ROLE from NAME and EMAIL
        ------------------------------------------------------------------------------
    */

    //alert(user.nickname)

    return(true);
}