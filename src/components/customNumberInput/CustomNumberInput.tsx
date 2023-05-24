import { NumberInput } from '@mantine/core';

interface ICustomNumberInput {
  label?: string;
  placeholder?: string;
  defaultValue?: number;
  handleInputChange: (value: number) => void;
  dataElem: string;
}

export const CustomNumberInput = (props: ICustomNumberInput) => {
  return (
    <NumberInput
      placeholder={props.placeholder}
      label={props.label}
      radius="md"
      rightSectionWidth={24}
      sx={{
        label: { fontWeight: 700, fontSize: '1rem', lineHeight: 1.187, marginBottom: '0.5rem' },
      }}
      styles={(theme) => ({
        rightSection: { height: 'auto', marginRight: '4px' },
        input: {
          height: '42px',
          fontSize: '14px',
          lineHeight: 1.428,
          '&:focus-within': {
            borderColor: theme.colors.accentLight[0],
          },
          padding: '0 0 0 12px',
          caretColor: theme.colors.accentLight[0],
        },
        control: {
          border: 'none',
          color: '#ACADB9',
          width: '12px',
          height: '12px',
          cursor: 'pointer',
        },
      })}
      onChange={(value: number) => {
        props.handleInputChange(value);
      }}
      value={props.defaultValue ? props.defaultValue : ''}
      data-elem={props.dataElem}
    />
  );
};
