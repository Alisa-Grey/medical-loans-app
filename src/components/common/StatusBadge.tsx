import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

enum statusColors {
  NEW = '#3437AD',
  CURRENT = '#82E3BA',
  FULLYPAYED = '#595A94',
  LATE = '#FBB707',
  DEFAULT = '#FB6E07',
  DELINQUENT = '#FB4207',
  CHARGEDOFF = '#D80303',
}

enum statusTitles {
  NEW = 'New',
  CURRENT = 'Current',
  FULLYPAYED = 'Fully payed',
  LATE = 'Late',
  DEFAULT = 'Default',
  DELINQUENT = 'Delinquent',
  CHARGEDOFF = 'Charged off',
}

export interface IStatusBadgeInterface {
  status: string;
  className?: string;
}

const StatusBadge: FC<IStatusBadgeInterface> = ({ status, className }) => {
  const color = statusColors[status as keyof typeof statusColors];
  const title = statusTitles[status as keyof typeof statusTitles];

  return (
    <Box
      sx={{
        width: 'max-content',
        padding: '7px 16px',
        borderRadius: '4px',
        backgroundColor: `${color}`,
      }}
      className={className}
    >
      <Typography variant='caption' sx={{ fontWeight: 600, color: '#fff' }}>
        {title}
      </Typography>
    </Box>
  );
};

export default StatusBadge;
