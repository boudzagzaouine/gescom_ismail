import { BriefcaseIcon, ClipboardListIcon, TagIcon } from '@heroicons/react/solid';
import { style_icon, style_span } from 'tools/constStyle';
import { Facture } from 'tools/types';
import NavTabsHeight from 'widgets/NavTabsHeight';
import { MenuNavTabs } from 'widgets/TypeWidgets';
import ListArticles from './ListArticleFacture';
import ListAvoirsManager from './ListAvoirsManager';
import ListConversionManager from './ListConversionManager';
import ListFactureManager from './ListFactureManger';
import ListJournalManager from './ListJournalManager';

type ListFacturationProp = {
    facture: Facture
    refetch: () => void
}


const ListFacturation = ({ facture, refetch }: ListFacturationProp) => {

    const facturations: MenuNavTabs[] = [
        {
            id: 1,
            name: (<><TagIcon className={style_icon} aria-hidden="true" /><span className={style_span}>Articles de la Facture</span></>),
            featured: (<ListArticles facture={facture} refetchParent={refetch}  />),
        }
    ]
    return (
        <div className=''>
            <NavTabsHeight tab={facturations} />
        </div>
    )

}

export default ListFacturation