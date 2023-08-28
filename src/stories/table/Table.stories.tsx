import type { Meta, StoryObj } from '@storybook/react';

import { Table } from 'stories/table/Table';
import {faFileAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {heading} from "server/fake/index";

const meta = {
    title: 'Displays/Table',
    component: Table,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
    args: {
        heading:heading,
        title:'دارایی ها',
        icon:<FontAwesomeIcon icon={faFileAlt}/>
    },
};

