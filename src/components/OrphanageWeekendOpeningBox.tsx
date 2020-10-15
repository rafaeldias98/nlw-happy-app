import React from 'react';
import { FiInfo } from "react-icons/fi";

import '../styles/components/orphanageWeekendOpeningBox.css';

interface Props {
  openOnWeekends: boolean;
}

export default function OrphanageWeekendOpeningBox(props: Props) {
  let className = 'open';
  let iconColor = '#39CC83';
  let boxMessage = 'Atendemos nos fins de semana';

  if (props.openOnWeekends === false) {
    className = 'no-open';
    iconColor = '#FF669D';
    boxMessage = 'Não atendemos nos fins de semana';
  }

  return (
    <div className={`open-on-weekends ${className}`}>
      <FiInfo size={32} color={`${iconColor}`} />
      {boxMessage}
    </div>
  );
};
