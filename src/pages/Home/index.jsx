import LandingNavbar from '../../components/Navbar'
import EventUpdates from './EventUpdates'
import PageTransition from '../../components/PageTransition'
import WelcomeButton from './WelcomeButton'
import { useIsPresent } from "framer-motion";

export default function Home(){
    const isPresent = useIsPresent()
    return(
        <div className='Home'>
            <PageTransition animated={true} isPresent={isPresent}/>
            <LandingNavbar/>
            <WelcomeButton/>
            <EventUpdates/>
        </div>
    )
}