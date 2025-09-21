import React from 'react';
import CloseIcon from '../icons/CloseIcon';

interface SpotifyPlayerProps {
    onClose: () => void;
}

// Example playlist: Spotify's "Peaceful Piano"
const SPOTIFY_PLAYLIST_URI = "spotify:playlist:37i9dQZF1DX4sWSpwq3LiO";
const embedUrl = `https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_URI.split(':')[2]}`;

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ onClose }) => {
    return (
        <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-sm m-4 relative animate-fade-in-up flex flex-col">
            <header className="flex items-center justify-between mb-4">
                 <h3 className="text-xl font-bold text-slate-800">Calming Music</h3>
                 <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600" aria-label="Close music player">
                    <CloseIcon />
                </button>
            </header>
            <main>
                <iframe
                    src={embedUrl}
                    width="100%"
                    height="380"
                    frameBorder="0"
                    allowTransparency={true}
                    allow="encrypted-media"
                    title="Spotify Music Player"
                    className="rounded-lg"
                ></iframe>
            </main>
        </div>
    );
};

export default SpotifyPlayer;
