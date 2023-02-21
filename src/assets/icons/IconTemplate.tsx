import React from 'react';

interface IProps {
  iconInfo: {
    svgOptions: {
      xmlns?: string;
      height?: number;
      width?: number;
      fill?: string;
      viewBox?: string;
    };
    paths: JSX.Element[];
  };
}

function IconTemplate({ iconInfo }: IProps) {
  return <svg {...iconInfo.svgOptions}>{iconInfo.paths.map(path => path)}</svg>;
}

export default IconTemplate;
