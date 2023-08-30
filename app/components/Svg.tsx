import React from "react";

const Svg = () => {
	return (
		<svg
			width="20px"
			height="20px"
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid"
		>
			<g transform="rotate(180 50 50)">
				<rect
					x="9.166666666666668"
					y="12.5"
					width="15"
					height="40"
					fill="#1BE063"
				>
					<animate
						attributeName="height"
						calcMode="spline"
						values="50;75;10;50"
						// times="0;0.33;0.66;1"
						dur="0.8695652173913042s"
						keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
						repeatCount="indefinite"
						begin="-0.6956521739130435s"
					></animate>
				</rect>
				<rect
					x="25.833333333333336"
					y="12.5"
					width="15"
					height="40"
					fill="#1BE063"
				>
					<animate
						attributeName="height"
						calcMode="spline"
						values="50;75;10;50"
						// times="0;0.33;0.66;1"
						dur="0.8695652173913042s"
						keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
						repeatCount="indefinite"
						begin="-0.5217391304347825s"
					></animate>
				</rect>
				<rect x="42.5" y="12.5" width="15" height="40" fill="#1BE063">
					<animate
						attributeName="height"
						calcMode="spline"
						values="50;75;10;50"
						// times="0;0.33;0.66;1"
						dur="0.8695652173913042s"
						keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
						repeatCount="indefinite"
						begin="-0.34782608695652173s"
					></animate>
				</rect>
				<rect
					x="59.16666666666667"
					y="12.5"
					width="15"
					height="40"
					fill="#1BE063"
				>
					<animate
						attributeName="height"
						calcMode="spline"
						values="50;75;10;50"
						// times="0;0.33;0.66;1"
						dur="0.8695652173913042s"
						keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
						repeatCount="indefinite"
						begin="0s"
					></animate>
				</rect>
				<rect
					x="75.83333333333333"
					y="12.5"
					width="15"
					height="40"
					fill="#1BE063"
				>
					<animate
						attributeName="height"
						calcMode="spline"
						values="50;75;10;50"
						// times="0;0.33;0.66;1"
						dur="0.8695652173913042s"
						keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
						repeatCount="indefinite"
						begin="-0.17391304347826086s"
					></animate>
				</rect>
			</g>
		</svg>
	);
};

export default Svg;
