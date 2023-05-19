import { useState } from 'react';
import './index.less'
import Video from './components/Video';
import { connect } from "react-redux";

const Player = (props: any) => {
    const { token } = props
    const [selectedVideo, setSelectedVideo] = useState<string>('');

    const handleClick = (videoId: string) => {
        setSelectedVideo(videoId);
    };

    return (
        <div className="player-grid">
            <div className="player-parent">
                <div className={`player-cell ${selectedVideo === 'video1' ? 'selected' : ''}`} onClick={() => handleClick('video1')}>
                    <Video token='4325--36' videoId="video1" session={token} />
                </div>
                <div className={`player-cell ${selectedVideo === 'video2' ? 'selected' : ''}`} onClick={() => handleClick('video2')}>
                    <Video token='4325--36' videoId="video2" session={token} />
                </div>
            </div>
            <div className="player-parent">
                <div className={`player-cell ${selectedVideo === 'video3' ? 'selected' : ''}`} onClick={() => handleClick('video3')}>
                    <Video token='4325--36' videoId="video3" session={token} />
                </div>
                <div className={`player-cell ${selectedVideo === 'video4' ? 'selected' : ''}`} onClick={() => handleClick('video4')}>
                    <Video token='4325--36' videoId="video4" session={token} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => state.global;
export default connect(mapStateToProps)(Player);
