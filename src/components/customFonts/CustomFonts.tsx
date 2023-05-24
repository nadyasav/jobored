import { Global } from '@mantine/core';
import regular from '../../assets/fonts/Inter-Regular.woff2';
import medium from '../../assets/fonts/Inter-Medium.woff2';

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Inter',
            src: `url('${regular}') format("woff2")`,
            fontWeight: 400,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Inter',
            src: `url('${medium}') format("woff2")`,
            fontWeight: 500,
            fontStyle: 'normal',
          },
        },
      ]}
    />
  );
}
