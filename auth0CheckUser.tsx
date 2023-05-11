import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

type roleAndAllowed = {
    allowed: boolean,
    role?: string,
}

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
export default function CheckUser(rolesAllowed?: String[]) : roleAndAllowed {
    const { user, error, isLoading } = useUser();
    const router = useRouter();

    if (isLoading) return <div>Loading...</div>;

    if (error) return(<div>{error.message}</div>);

    if (!user) {
        router.push('/api/auth/login?returnTo=/');
        return{
            'allowed': false,
            'role': null,
        };
    }

    /*
        ------------------------------------------------------------------------------
        INSERT CODE that connects to database and gets user's ROLE from NAME and EMAIL
        ------------------------------------------------------------------------------
    */

    var role
    // ideally this would fetch role from prsima database
    if(user.email == 'guerbray@gmail.com')
        role = 'Admin'
    else
        role = "Technician"

    // if any of the users are allowed, return true and send the role
    for(const roleAllowed of rolesAllowed) {
        if (roleAllowed == role)
            return{
                'allowed': true, 
                'role': role,
            };
    }

    // else, send to the login screen
    router.push('/api/auth/logout');
    return{
        'allowed': false,
        'role': null,
    };
}