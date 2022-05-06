import { useNavigate } from 'remix';
import { TitleApp } from '../shared/TitleApp';

export const Header = () => {
  const navigate = useNavigate();
  const goToForm = () => navigate('/');

  return (
    <header>
      <TitleApp handleClick={goToForm} />
    </header>
  )
}
