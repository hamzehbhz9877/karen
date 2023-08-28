import type { Meta, StoryObj } from '@storybook/react';

import { Card } from 'stories/card/Card';

const meta = {
    title: 'Displays/Card',
    component: Card,
    tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the icons you need
import {
    faFileAlt
} from "@fortawesome/free-solid-svg-icons";
import {toCommas} from "utils/index";

export const Primary: Story = {
    args: {
        label:toCommas(491670)+' '+'ریال',
        title:'دارایی کل',
        icon:<FontAwesomeIcon icon={faFileAlt}/>
    },
};
