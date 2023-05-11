import CheckUser  from '../auth0CheckUser';
import { useRouter } from 'next/router';

export default function Home()
{
    const {allowed, role} = CheckUser(["Admin", "BCBA", "Technician", "Guardian"])
    if(!allowed) return(<div>Redirecting...</div>);

    const router = useRouter();

    /*
        Ideally some code would go here that sends user to correct location
    */

    // Here would go fetch for a parent's student
    // Right now, since our MongoDB backend can't do that, this is hardcoded
    const studentID = "64546bd1018a8713c39974a8"

    if(role == "Guardian")
        router.push("/student/profile?id=64546bd1018a8713c39974a8")
    else 
        router.push('student/search')

    return(null);
};