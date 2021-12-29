import React from 'react';
import { useSelector } from 'react-redux';

import './directory.styles.scss';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import MenuItem from '../menu-item/menu-item.component';

const Directory = () => {

  const sections = useSelector(selectDirectorySections);

  return (
    <div className='directory-menu'>
      {
        sections.map(({ id, ...otherProps }) => (
          <MenuItem key={id} {...otherProps} />
        ))
      }
    </div>
  )
}

export default Directory