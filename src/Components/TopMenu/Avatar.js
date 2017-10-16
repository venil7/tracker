import React from 'react';
import { compose } from 'recompose';
import { authOnlyEnhancer } from './AuthLink';
import { styledComponent } from '../../Utils/index';

const Avatar = props => (
  <img src={props.auth.userProfile.picture} alt="avatar" {...props} />
);

const withStyles = styledComponent`
  width: 30px;
  height: 30px;
  border-radius: 10px;
`;

const StyledAvatar = compose(withStyles, authOnlyEnhancer)(Avatar);

export { StyledAvatar as Avatar };
