import * as React from 'react';

const paths = [
  <path
    style={{
      fillRule: 'evenodd',
      fill: '#d8d8d8',
      fillOpacity: 1,
      strokeWidth: 4,
      strokeLinecap: 'butt',
      strokeLinejoin: 'miter',
      stroke: '#000',
      strokeOpacity: 1,
      strokeMiterlimit: 4,
    }}
    d="m12.759 10.122.089 20.884"
    transform="matrix(.57143 0 0 .57143 1.143 .571)"
  />,
  <path
    style={{
      fill: 'none',
      strokeWidth: 4,
      strokeLinecap: 'butt',
      strokeLinejoin: 'miter',
      stroke: '#000',
      strokeOpacity: 1,
      strokeMiterlimit: 4,
    }}
    d="M.495 24.614v22.388M20.736.244v8.121M7.55 1.987h11.204l-4.17 6.33h21.39l-7.212 14.02 7.212 15.006H12.848v-6.337H.55V8.987a7 7 0 0 1 7-7Zm0 0"
    transform="matrix(.57143 0 0 .57143 1.143 .571)"
  />,
];

function FlagIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={28}>
      {paths.map(path => path)}
    </svg>
  );
}

export default FlagIcon;
