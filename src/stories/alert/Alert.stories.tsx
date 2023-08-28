import type { Meta, StoryObj } from '@storybook/react';

import { Alert } from 'stories/alert/Alert';

const meta = {
    title: 'Displays/Alert',
    component: Alert,
    tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

const children=<ul>
    <li>آیتم 1</li>
    <li>آیتم 2</li>
</ul>

export const Primary=()=><Alert type={"danger"} title={'عنوان'}>{children}</Alert>
