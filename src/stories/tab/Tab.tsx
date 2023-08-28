'use client'

import React from 'react';
import './Tab.scss';
import Link from "next/link";
import {usePathname} from "next/navigation";

interface TabProps {
    tabs: Array<{ path: string, label: string, icon: React.ReactElement}>
    className?: string;
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
}


export const Tab = ({
                        size = 'medium',
                        tabs,
                        className,
                        ...props
                    }: TabProps) => {

    const pathname=usePathname()
    const isActive=(path:string)=>path===pathname ? 'tabs__item--active' : 'tabs__item-disActive'
    return (
        <ul className='tabs'>
            {tabs.map(({icon, label, path},index) =>
                <li aria-current="page" key={index}
                    {...props}>
                    <Link  className={['tabs__item', `tabs--${size}`, className, isActive(path)].join(' ')} href={path}>
                        <span>{icon}{label}</span>
                    </Link>
                </li>
            )}
        </ul>
    );
};
