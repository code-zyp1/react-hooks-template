import React, { useEffect } from 'react';
import { H5sPlayerWS } from '../../../assets/js/h5splayer';

interface VideoPlayerProps {
    token: string;
    videoId: string;
    session: string;
}

const videoStyle = {
    width: '100%', // 这将使视频宽度等于其父元素宽度
    height: 'auto' // 这将使视频高度自动根据宽度调整，保持原始宽高比
};

const Video: React.FC<VideoPlayerProps> = ({ token, videoId, session }) => {
    useEffect(() => {
        const conf = {
            videoid: videoId,
            protocol: window.location.protocol,
            host: 'localhost:18085',
            streamprofile: 'main',
            rootpath: '/',
            token: token,
            hlsver: 'v1',
            rtcengine: 'v1',
            session: session,
            consolelog: 'true'
        };

        let h5handler = new H5sPlayerWS(conf);
        h5handler.connect();

        // The return function in useEffect is called when the component unmounts. It's the perfect place to clean up!
        return () => {
            h5handler.disconnect();
        }
    }, [token, videoId, session]); // Only re-run the effect if token, videoId or session changes

    return (
        <div>
            <video id={videoId} style={videoStyle} autoPlay playsInline />
        </div>
    );
};

export default Video;
