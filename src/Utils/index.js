import styled from 'styled-components';
const styledComponent = (...args) => Component => styled(Component)(...args);

export { styledComponent };
