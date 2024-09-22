import React from 'react';
import PropTypes from 'prop-types';

const ChillMeter = ({ greenspacePercentage }) => {
    const fillWidth = `${greenspacePercentage}%`;

    return (
        <div className="chill-meter-container" style={{ width: '100%', height: '50px', border: '1px solid #000', position: 'relative' }}>
            <div className="chill-meter-fill" style={{ width: fillWidth, height: '100%', backgroundColor: 'rgba(0, 128, 0, 0.5)', position: 'absolute', top: 0, left: 0 }}></div>
            <div className="chill-meter-label" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#000' }}>
                {greenspacePercentage.toFixed(2)}%
            </div>
        </div>
    );
};

ChillMeter.propTypes = {
    greenspacePercentage: PropTypes.number.isRequired,
};

export default ChillMeter;
