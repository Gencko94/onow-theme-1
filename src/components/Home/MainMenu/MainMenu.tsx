import MenuItem from './MenuItem/MenuItem';
import { TiDocumentText } from 'react-icons/ti';
import { FaQuestion } from 'react-icons/fa';
import { IoMdCall } from 'react-icons/io';
import { AiOutlineBranches } from 'react-icons/ai';
import styled from 'styled-components';
const MainMenu = () => {
  const menus = [
    {
      title: 'Our Menu',
      icon: <TiDocumentText size={30} />,
    },
    {
      title: 'Order Status',
      icon: <FaQuestion size={30} />,
    },
    {
      title: 'Call us',
      icon: <IoMdCall size={30} />,
    },
    {
      title: 'Branches',
      icon: <AiOutlineBranches size={30} />,
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
