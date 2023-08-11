import loadImage from '../Resources/loading.gif';
import './loading.css';
function Loading()
{
    return(
        <div id='loadScreen'>
            <img id='loadingImage' src={loadImage} alt="loading..."></img>
        </div>
    );
}
export default Loading;