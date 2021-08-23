export default [
    {
        parent: {
            th: 'ร้านค้า',
            en: 'Shops'
        },
        to: '/mpos',
        icon: '/media/svg/icons/Design/Cap-2.svg',
        child: [
            {
                parent: {
                    th: 'สร้างร้านค้า',
                    en: 'Create Shop'
                },
                to: '/mpos/ร้านค้า/สร้างร้านค้า',
                icon: 'menu-bullet-dot',
                child: [
                    
                ]
            },
            {
                parent: {
                    th: 'สร้างพนักงาน',
                    en: 'Create Employee'
                },
                to: '/mpos/ร้านค้า/สร้างพนักงาน',
                icon: 'menu-bullet-dot',
                child: [

                ]
            }
        ]
    },
    {
        parent: {
            th: 'ซื้อ',
            en: 'Buy'
        },
        to: '',
        icon: '/media/svg/icons/Design/Cap-2.svg',
        child: [
            {
                parent: {
                    th: 'สั่งซื้อ',
                    en: 'Create Shop'
                },
                to: '/mpos/ซื้อ/สั่งซื้อ',
                icon: 'menu-bullet-dot',
                child: [

                ]
            },
            {
                parent: {
                    th: 'สั่งซื้อวัตถุดิบ',
                    en: 'Create Employee'
                },
                to: '/mpos/ซื้อ/สั่งซื้อวัตถุดิบ',
                icon: 'menu-bullet-dot',
                child: [

                ]
            },
            {
                parent: {
                    th: 'ซัพฟลายเออร์',
                    en: 'Supplier'
                },
                to: '/mpos/ซื้อ/ซัพฟลายเออร์',
                icon: 'menu-bullet-dot',
                child: [

                ]
            }
        ]
    },
    {
        parent: {
            th: 'สต๊อก',
            en: 'Store'
        },
        to: '',
        icon: '/media/svg/icons/Design/Cap-2.svg',
        child: [
            {
                parent: {
                    th: 'นับสต๊อก',
                    en: 'Check Store'
                },
                to: '/mpos/สต๊อก/นับสต๊อก',
                icon: 'menu-bullet-dot',
                child: [

                ]
            },
            {
                parent: {
                    th: 'สต๊อกวัตถุดิบ',
                    en: 'Raw material stock'
                },
                to: '/mpos/ร้านค้า/สต๊อกวัตถุดิบ',
                icon: 'menu-bullet-dot',
                child: [

                ]
            }
        ]
    }
];