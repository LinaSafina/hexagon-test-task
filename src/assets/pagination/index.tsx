export type SvgProps = React.SVGAttributes<SVGSVGElement>

export type SvgColorProps = {
  color?: string
  backgroundColor?: string
  svgProps?: SvgProps
}

// export const LastPageIcon = ({ color, svgProps }: SvgColorProps) => (
// 	<svg
// 		width="24"
// 		height="24"
// 		viewBox="0 0 24 24"
// 		fill="none"
// 		xmlns="http://www.w3.org/2000/svg"
// 		{...svgProps}
// 	>
// 		<path d="M10 7L15 12L10 17V7Z" fill={color || 'black'} />
// 		<line
// 			y1="-0.5"
// 			x2="10"
// 			y2="-0.5"
// 			transform="matrix(4.37114e-08 1 1 -4.37114e-08 19 7)"
// 			stroke={color || 'black'}
// 		/>
// 	</svg>
// );

export const FirstPageIcon = ({ color, svgProps }: SvgColorProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...svgProps}
  >
    <path d="M14 7L9 12L14 17V7Z" fill={color || 'black'} />
    <line x1="5.5" y1="7" x2="5.5" y2="17" stroke={color || 'black'} />
  </svg>
)

export const PreviousPageIcon = ({ color, svgProps }: SvgColorProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...svgProps}
  >
    <path d="M14 7L9 12L14 17V7Z" fill={color || 'black'} />
  </svg>
)

export const NextPageIcon = ({ color, svgProps }: SvgColorProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...svgProps}
  >
    <path d="M10 17L15 12L10 7V17Z" fill={color || 'black'} />
  </svg>
)
