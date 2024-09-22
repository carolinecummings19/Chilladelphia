import React, { useEffect } from 'react';
import Radar from 'radar-sdk-js';
import 'radar-sdk-js/dist/radar.css';

const RadarMap = ({ coordinates }) => {
    useEffect(() => {
        // Initialize Radar with your publishable API key
        Radar.initialize('prj_live_pk_5d7c81dfa66723740042a5be87c66c9374b70123');

        // create map
        const map = Radar.ui.map({
            container: 'map',
            center: coordinates ? [coordinates.lng, coordinates.lat] : undefined,
        });

        map.on('load', () => {
            const { lng, lat } = map.getCenter();

            // add marker to map at map center
            Radar.ui.marker({
                url: 'https://radar.com/static/image/logo.png',
                width: '48px',
                height: '48px',
                popup: {
                    text: 'Radar HQ',
                },
            })
            .setLngLat([lng, lat])
            .addTo(map);
        });
    }, [coordinates]);

    return (
        <div id="map-container" style={{ width: '100%', height: '100%' }}>
            <div id="map" style={{ height: '100%', width: '100%' }} />
        </div>
    );
};

export default RadarMap;