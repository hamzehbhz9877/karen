import type { Meta } from '@storybook/react';

import { Loading } from 'stories/utilities/loading/Loading';
import {Alert} from "stories/alert/Alert";

const meta = {
    title: 'Utilities/Loading',
    component: Loading,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Loading>;

export default meta;

export const Primary =()=><Loading/>
