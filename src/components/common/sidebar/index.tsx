import React, { FC } from 'react';
import { Link, useMatch, useResolvedPath, LinkProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { List, ListItem } from '@mui/material';

import { AuthActionsEnum } from '../../../store/actions/auth';
import './style.scss';

interface ILinkProps extends LinkProps {
  to: string;
  children: string;
  props?: LinkProps;
}

const pages = [
  { title: 'My profile', path: '/me/profile' },
  { title: 'History', path: '/me/history' },
  { title: 'Security', path: '/me/security' },
];

const CustomLink: FC<ILinkProps> = ({ to, children, props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <>
      <Link
        to={to}
        {...props}
        style={{
          width: '100%',
          paddingRight: 0,
          color: match ? '#0E117B' : '#2FBB80',
          borderColor: match ? '#3437AD' : '#B9BAD4',
        }}
        className='basic-link sidebar__link'
      >
        {children}
      </Link>
    </>
  );
};

const Sidebar: FC = () => {
  const dispatch = useDispatch();
  const handleLogout = (): void => {
    dispatch({ type: AuthActionsEnum.LOG_OUT });
  };

  return (
    <List className='sidebar'>
      {pages.map((page, index) => (
        <ListItem key={index} className='sidebar__item'>
          <CustomLink to={page.path}>{page.title}</CustomLink>
        </ListItem>
      ))}
      <ListItem
        id='logout'
        className='basic-link sidebar__item'
        onClick={handleLogout}
      >
        log out
      </ListItem>
    </List>
  );
};

export default Sidebar;
