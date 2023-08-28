import type { Meta, StoryObj } from '@storybook/react';

import { Tab } from 'stories/tab/Tab';

const meta = {
    title: 'Displays/Tab',
    component: Tab,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

import {tabs} from "app/(panel)/panel/components/header/header";


export const Primary: Story = {
    args: {
        tabs:tabs
    },
};

