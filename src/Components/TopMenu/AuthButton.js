import React from 'react';
import Button from '../Button';
import { authOnlyEnhancer } from './AuthLink';

const AuthButton = authOnlyEnhancer(props => <Button {...props} />);

export { AuthButton };
