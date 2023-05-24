import { Button } from '@mantine/core';

interface ICustomButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  handleClick: () => void;
  dataElem: string;
}

export const CustomButton = (props: ICustomButton) => {
  const { children, fullWidth = false, handleClick, dataElem, ...btnProps } = props;
  return (
    <Button
      radius="md"
      fullWidth={fullWidth ? true : false}
      sx={(theme) => ({
        background: theme.colors.accentLight[0],
        height: '42px',
        '&:hover': {
          background: theme.colors.hoverLight[0],
        },
        '&:active': {
          background: theme.colors.activeLight[0],
        },
      })}
      onSubmit={handleClick}
      onClick={handleClick}
      data-elem={dataElem}
      {...btnProps}
    >
      {children}
    </Button>
  );
};
