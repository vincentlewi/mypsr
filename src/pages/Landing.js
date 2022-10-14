import PageTransition from '../components/PageTransition';
import House from '../components/House';
import LandingNavbar from '../components/LandingNavbar';
import LandingContent from '../components/LandingContent';
import { useIsPresent } from "framer-motion";

export default function Landing() {
    const isPresent = useIsPresent();
    return(
        <div className="Landing">
            <PageTransition isPresent={isPresent} />
            <LandingNavbar />
            <House />
            <LandingContent />
        </div>
    )
}