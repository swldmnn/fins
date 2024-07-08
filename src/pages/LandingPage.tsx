import FileChooser from "../components/FileChooser"
import FinsCard from "../components/FinsCard"
import { FinsLogo } from "../components/FinsLogo"

const LandingPage = () => {
    return <div className='LandingPage'>
        <FinsLogo sx={{ width: '10rem', height: '3rem' }} color='primary'></FinsLogo>
        <FinsCard>
            <FileChooser showFileCount={false}></FileChooser>
        </FinsCard>
    </div>
}

export default LandingPage