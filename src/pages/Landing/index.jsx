import PageTransition from '../../components/PageTransition';
import House from './House';
import Navbar from '../../components/NavbarPreLogin';
import LandingContent from './LandingContent';
import { useIsPresent } from "framer-motion";
import './Landing.css'

export default function Landing() {
    const isPresent = useIsPresent()
    return(
        <div className="Landing">
            <PageTransition animated={true} isPresent={isPresent}/>
            <Navbar/>
            <House />
            <LandingContent />
        </div>
    )
}