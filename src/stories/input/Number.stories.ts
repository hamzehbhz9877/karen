import type { Meta, StoryObj } from '@storybook/react';

import { InputNumber } from 'stories/input/Number';

const meta = {
    title: 'Data Input/Number',
    component: InputNumber,
    tags: ['autodocs'],
} satisfies Meta<typeof Number>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: 'Number',
        title:'تعداد'
    },
};
