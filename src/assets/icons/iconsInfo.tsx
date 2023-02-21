import React from 'react';

export const cancelIconInfo = {
  svgOptions: {
    xmlns: 'http://www.w3.org/2000/svg',
    height: 36,
    width: 36,
    fill: '#f44335',
  },
  paths: [
    <path d="M0 0h24v24H0z" fill="none" />,
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />,
  ],
};

export const categoryIconInfo = {
  svgOptions: {
    xmlns: 'http://www.w3.org/2000/svg',
    height: 24,
    viewBox: '0 0 20 20',
    width: 24,
    fill: '#FFF',
  },
  paths: [
    <path fill="none" d="M0 0h20v20H0z" />,
    <path d="M10.75 10H17v5.5c0 .83-.67 1.5-1.5 1.5h-4.75v-7zM4.5 3C3.67 3 3 3.67 3 4.5v10.94C3 16.3 3.7 17 4.56 17h4.69V3H4.5zM17 8.5v-4c0-.83-.67-1.5-1.5-1.5h-4.75v5.5H17z" />,
  ],
};

export const userIconInfo = {
  svgOptions: {
    xmlns: 'http://www.w3.org/2000/svg',
    height: 24,
    viewBox: '0 0 24 24',
    width: 24,
    fill: '#FFF',
  },
  paths: [
    <path d="M0 0h24v24H0V0z" fill="none" />,
    <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
  ],
};

export const flagIconInfo = {
  svgOptions: {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 28,
    fill: '#FFF',
  },
  paths: [
    <path
      style={{
        fillRule: 'evenodd',
        fill: '#d8d8d8',
        fillOpacity: 1,
        strokeWidth: 4,
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter',
        stroke: '#FFF',
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
        stroke: '#FFF',
        strokeOpacity: 1,
        strokeMiterlimit: 4,
      }}
      d="M.495 24.614v22.388M20.736.244v8.121M7.55 1.987h11.204l-4.17 6.33h21.39l-7.212 14.02 7.212 15.006H12.848v-6.337H.55V8.987a7 7 0 0 1 7-7Zm0 0"
      transform="matrix(.57143 0 0 .57143 1.143 .571)"
    />,
  ],
};

export const doneIconInfo = {
  svgOptions: {
    xmlns: 'http://www.w3.org/2000/svg',
    height: 36,
    viewBox: '0 0 24 24',
    width: 36,
    fill: '#4caf50',
  },
  paths: [
    <path d="M0 0h24v24H0z" fill="none" />,
    <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />,
  ],
};

export const logoutIconInfo = {
  svgOptions: {
    xmlns: 'http://www.w3.org/2000/svg',
    height: 28,
    viewBox: '0 0 24 24',
    width: 28,
    fill: '#FFF',
  },
  paths: [
    <path d="M0 0h24v24H0V0z" fill="none" />,
    <path d="m17 8-1.41 1.41L17.17 11H9v2h8.17l-1.58 1.58L17 16l4-4-4-4zM5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5V5z" />,
  ],
};
