import { Button } from '@mantine/core';

interface ICustomButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  customStyles?: { [key: string]: string };
  handleClick: () => void;
  dataElem: string;
}

export const CustomButton = (props: ICustomButton) => {
  const { children, fullWidth = false, customStyles, handleClick, dataElem, ...btnProps } = props;
  return (
    <Button
      radius="md"
      fullWidth={fullWidth ? true : false}
      sx={(theme) => ({
        background: theme.colors.accentLight[0],
        height: '40px',
        '&:hover': {
          background: theme.colors.hoverLight[0],
        },
        '&:active': {
          background: theme.colors.activeLight[0],
        },
        ...customStyles,
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
