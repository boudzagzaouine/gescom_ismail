import { BriefcaseIcon, ClipboardListIcon } from '@heroicons/react/solid';
import { style_icon, style_span } from 'tools/constStyle';
import NavTabsHeight from 'widgets/NavTabsHeight';
import { MenuNavTabs } from 'widgets/TypeWidgets';
import ListAvoirsManager from './ListAvoirsManager';
import ListConversionManager from './ListConversionManager';
import ListFactureManager from './ListFactureManger';
import ListJournalManager from './ListJournalManager';




const ListFacturation = () => {

    const facturations: MenuNavTabs[] = [
        {
            id: 1,
            name: (<><BriefcaseIcon className={style_icon} aria-hidden="true" /><span className={style_span}>Factures</span></>),
            featured: (<ListFactureManager />),
        },
        {
            id: 2,
            name: (<><ClipboardListIcon className={style_icon} aria-hidden="true" /><span className={style_span}>Avoirs</span></>),
            featured: (<ListAvoirsManager />),
        },
        {
            id: 3,
            name: (<><ClipboardListIcon className={style_icon} aria-hidden="true" /><span className={style_span}>Conversions</span></>),
            featured: (<ListConversionManager />),
        },
        {
            id: 4,
            name: (<><ClipboardListIcon className={style_icon} aria-hidden="true" /><span className={style_span}>Jpurnals</span></>),
            featured: (<ListJournalManager />),
        },
    ]
    return (
        <div className=''>
            <NavTabsHeight tab={facturations} />
        </div>
    )

}

export default ListFacturation