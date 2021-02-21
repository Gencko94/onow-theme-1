import MenuItem from './MenuItem/MenuItem';
import { TiDocumentText } from 'react-icons/ti';
import { FaQuestion } from 'react-icons/fa';
import { MdBook } from 'react-icons/md';
import { AiOutlineBranches } from 'react-icons/ai';
import styled from 'styled-components';
const MainMenu = () => {
  const menus = [
    {
      title: 'Our Menu',
      icon: <TiDocumentText size={30} />,
      link: '/categories',
    },
    {
      title: 'Order Status',
      icon: <FaQuestion size={30} />,
      link: '/',
    },
    {
      title: 'Book a table',
      icon: <MdBook size={30} />,
      link: '/booking',
    },
    {
      title: 'Branches',
      icon: <AiOutlineBranches size={30} />,
      link: '/branches',
    },
  ];

  return (
    <Container>
      <div className="main-menu__container">
        {menus.map(menu => (
          <MenuItem menu={menu} />
        ))}
      </div>
    </Container>
  );
};

export default MainMenu;

const Container = styled.div`
  margin-bottom: 3rem;
  padding: 0.5rem;
`;
