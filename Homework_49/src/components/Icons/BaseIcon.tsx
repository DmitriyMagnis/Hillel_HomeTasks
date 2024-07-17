import SvgIcon from '@mui/material/SvgIcon';
import { type PropsWithChildren } from 'react';

const BaseIcon = ({
  color = 'primary.main',
  children,
  ...props
}: PropsWithChildren<{ color?: string }>) => {
  return (
    <SvgIcon sx={{ color, fill: color }} {...props}>
      {children}
    </SvgIcon>
  );
};

export default BaseIcon;
