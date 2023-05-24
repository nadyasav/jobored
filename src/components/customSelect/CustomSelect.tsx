import React, { useState } from 'react';
import { Select } from '@mantine/core';
import { IconDropDown } from '../iconDropDown/IconDropDown';

interface ICustomSelect {
  label?: string;
  placeholder?: string;
  data: Array<{ value: string; label: string }>;
  handleSelectChange: (value: string) => void;
  defaultValue?: string;
}

export const CustomSelect = (props: ICustomSelect) => {
  const [openState, setOpenState] = useState<boolean>(false);

  return (
    <Select
      label={props.label}
      placeholder={props.placeholder}
      rightSection={<IconDropDown open={openState} />}
      rightSectionWidth={31}
      radius="md"
      styles={(theme) => ({
        rightSection: { pointerEvents: 'none', paddingRight: '16px' },
        dropdown: { borderRadius: theme.radius.md },
        item: {
          borderRadius: theme.radius.md,
          height: '36px',
          fontSize: '14px',
          lineHeight: 1.428,
          '&:hover': {
            background: theme.colors.hoverLight[1],
          },
        },
      })}
      sx={{
        label: { fontWeight: 700, fontSize: '1rem', lineHeight: 1.187, marginBottom: '0.5rem' },
        input: { height: '42px', fontSize: '14px', lineHeight: 1.428 },
      }}
      maxDropdownHeight={275}
      onDropdownOpen={() => {
        setOpenState(true);
      }}
      onDropdownClose={() => {
        setOpenState(false);
      }}
      onChange={(value: string) => {
        props.handleSelectChange(value);
      }}
      data={props.data}
      value={props.defaultValue}
      data-elem={'industry-select'}
    />
  );
};
