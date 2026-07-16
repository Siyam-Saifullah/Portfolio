import { useEffect, useRef, useCallback } from 'react';

const YouTubePlayer = ({ videoId, className, title, autoplay = false }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);

    const killCaptions = useCallback((player) => {
        // Aggressive multi-approach caption removal
        const attempts = [
            () => player.unloadModule?.('captions'),
            () => player.unloadModule?.('CC'),
            () => player.setOption?.('captions', 'track', {}),
            () => player.setOption?.('cc', 'track', {}),
            () => {
                // Try to set captions to a non-existent language
                try { player.loadModule?.('captions'); } catch (e) { }
                try { player.setOption?.('captions', 'reload', true); } catch (e) { }
            },
        ];

        // Run all attempts
        attempts.forEach(fn => {
            try { fn(); } catch (e) { /* ignore */ }
        });

        // Retry after player is fully loaded
        setTimeout(() => {
            attempts.forEach(fn => {
                try { fn(); } catch (e) { /* ignore */ }
            });
        }, 500);

        setTimeout(() => {
            attempts.forEach(fn => {
                try { fn(); } catch (e) { /* ignore */ }
            });
        }, 1500);
    }, []);

    const initPlayer = useCallback(() => {
        if (!window.YT || !window.YT.Player || !containerRef.current) return;

        playerRef.current = new window.YT.Player(containerRef.current, {
            videoId,
            playerVars: {
                autoplay: autoplay ? 1 : 0,
                rel: 0,
                modestbranding: 1,
                controls: 0,
                showinfo: 0,
                cc_load_policy: 0,
                iv_load_policy: 3,
                disablekb: 1,
                fs: 0,
                playsinline: 1,
                enablejsapi: 1,
                origin: window.location.origin,
                hl: 'none', // Try to disable language
                cc_lang_pref: 'none',
            },
            events: {
                onReady: (event) => {
                    killCaptions(event.target);
                },
                onStateChange: (event) => {
                    // Kill captions every time playback state changes
                    if (event.data === window.YT.PlayerState.PLAYING) {
                        killCaptions(event.target);
                    }
                },
            },
        });
    }, [videoId, autoplay, killCaptions]);

    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => {
                initPlayer();
            };
        } else {
            initPlayer();
        }

        return () => {
            if (playerRef.current && playerRef.current.destroy) {
                playerRef.current.destroy();
            }
        };
    }, [initPlayer]);

    return (
        <div
            ref={containerRef}
            className={className}
            title={title}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default YouTubePlayer;