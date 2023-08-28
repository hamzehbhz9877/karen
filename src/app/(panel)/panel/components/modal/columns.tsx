import React, {useEffect, useState} from 'react';
import "./columns.scss"
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {faBarChart, faFile, faFolder, faFolderOpen} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props = {
    data: any
    getId?: (id: any) => void
    getUrl?: (url: string) => void
}

const Columns = ({data, getId, getUrl}: Props) => {

    const [res, setRes] = useState<any>([])

    const [filter, setFilter] = useState('')


    const activeClassName = (id: any, url: string, type: string) => {
        if (type === 'folder') {
            if (getId) getId(id)
            
        } else {
            if (getUrl) getUrl(url.split("/")[1])
        }

        if(type==='folder')
        {
            const newRes: any = res.map((item:any) => {
                if (id === item.id) return {...item, isActive: true}
                else return {...item, isActive: false}
            })
            setRes(newRes)
        }

    }

    useEffect(() => {
        if (data)
            setRes(data.map((item:any) => ({...item, isActive: false})))
    }, [data])

    const filterRes = res.filter((data:any) => data.label.toLowerCase().trim().indexOf(filter.toLowerCase()) !== -1)

    if (data.length===0) return null

    return (
        <div className='column'>
            <ul>
                <li className="search"><input value={filter} onChange={e => setFilter(e.target.value)} type="text"
                                              placeholder=" فیلتر"/></li>
                {filterRes?.map(({label, id, type, isActive, url}:any, index:number) =>
                    <li key={index} data-node-id={id} data-market="false"
                        onClick={(e) => activeClassName(id, url, type)}
                        className={isActive ? 'active' : ''}
                        title={label}>
                        <div className="right-icon">
                            {type === 'folder' ? <FontAwesomeIcon icon={isActive ? faFolderOpen : faFolder}/> :
                                <FontAwesomeIcon icon={faFile}/>}
                        </div>
                        {label}
                        {type === 'folder' ? <FontAwesomeIcon icon={faAngleLeft}/> :
                            <FontAwesomeIcon icon={faBarChart}/>}
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Columns;