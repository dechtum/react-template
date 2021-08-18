export default [
    {
        parent: {
            th: 'ขาย',
            en: 'Shops'
        },
        to: '/mpos',
        icon: '/media/svg/icons/Design/Cap-2.svg',
        child: [
            {
                parent: {
                    th: 'ขายสินค้า[หน้าร้าน]',
                    en: 'Create Shop'
                },
                to: '/mpos/ขายสินค้า/ขายสินค้า',
                icon: 'menu-bullet-dot',
                child: [
                    
                ]
            },
            {
                parent: {
                    th: 'สินค้า',
                    en: 'Product'
                },
                to: '/mpos/ขายสินค้า/สินค้า',
                icon: 'menu-bullet-dot',
                child: [

                ]
            }
        ]
    },
    {
        parent: {
            th: 'สรุป',
            en: 'Summarize'
        },
        to: '/mpos/สรุป/สรุป',
        icon: '/media/svg/icons/Design/Cap-3.svg',
        child: [
            
        ]
    },
    {
        parent: {
            th: 'บริการ',
            en: 'Service'
        },
        to: '/บริการ',
        icon: '/media/svg/icons/Design/Cap-3.svg',
        child: [
            {
                parent: {
                    th: 'แจ้งปัญหา',
                    en: 'Report a problem'
                },
                to: '/mpos/บริการ/แจ้งปัญหา',
                icon: 'menu-bullet-dot',
                child: [

                ]
            },
            {
                parent: {
                    th: 'ต่อสัญญา',
                    en: 'Contract'
                },
                to: '/mpos/บริการ/ต่อสัญญา',
                icon: 'menu-bullet-dot',
                child: [

                ]
            }
        ]
    }
];