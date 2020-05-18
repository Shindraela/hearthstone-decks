import React from 'react'
import PropTypes from 'prop-types'
import '../css/index.css';

export default function LoadingRing({ color, size, className, style }) {
	const circles = [...Array(4)].map((_, index) => {
		return (
			<div
				key={index}
				style={{
					borderColor: `${color} transparent transparent transparent`,
					width: size * 0.8,
					height: size * 0.8,
					margin: size * 0.1,
					borderWidth: size * 0.1,
				}}
			></div>
		)
	})

	return (
		<div className={`lds-ring ${className}`} style={{ width: size, height: size, ...style }}>
			{circles}
		</div>
	)
}

LoadingRing.propTypes = {
	/** hex color */
	color: PropTypes.string,
	/** size in pixel */
	size: PropTypes.number,
	/** class name  */
	className: PropTypes.string,
	/** style object */
	style: PropTypes.object,
}

LoadingRing.defaultProps = {
	color: '#7f58af',
	size: 80,
	className: '',
	style: {},
}