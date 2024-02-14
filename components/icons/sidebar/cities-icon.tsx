import { faCity } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props extends React.SVGAttributes<SVGElement> {}

export const CitiesIcon = ({ ...props }: Props) => {
  return <FontAwesomeIcon icon={faCity} />;
};
