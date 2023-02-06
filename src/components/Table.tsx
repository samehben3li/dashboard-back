import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  theads: string[];
  children: ReactNode;
}

function Table({ theads, children }: IProps) {
  const { t } = useTranslation();
  return (
    <table>
      <thead>
        <tr>
          {theads.map(th => (
            <th key={th}>{`${t(th)}`}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export default Table;
