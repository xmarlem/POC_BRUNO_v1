export class NavigationModel
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'applications',
                'title'   : 'Applications',
                'type'    : 'group',
                'icon'    : 'apps',
                'children': [
                    {
                        'id'   : 'dashboard',
                        'title': 'Dashboard',
                        'type'    : 'collapse',                        
                        'icon' : 'dashboard',
                        'url'  : '/apps/dashboards/project',
                        'badge': {
                            'title': 2,
                            'bg'   : '#F44336',
                            'fg'   : '#FFFFFF'
                        },
                        'children': [
                            {
                                'id'   : 'dashboard',
                                'title': 'Search for Job Positions',
                                'type' : 'item',
                                'icon' : 'search',
                                'url'  : '/apps/e-commerce/orders'
                            }
                        ]    
                    },
                    {
                        'id'   : 'my-profile',
                        'title': 'Profile',
                        'type' : 'item',
                        'icon' : 'web_asset',
                        'url'  : '/ui/my-profile'
                    },
                    {
                        'id'   : 'chat',
                        'title': 'Chat',
                        'type' : 'item',
                        'icon' : 'chat',
                        'url'  : '/apps/chat',
                        'badge': {
                            'title': 4,
                            'bg'   : '#09d261',
                            'fg'   : '#FFFFFF'
                        }
                    },
                    {
                        'id'   : 'cs-contracts',
                        'title': 'CS Contacts',
                        'type' : 'item',
                        'icon' : 'account_box',
                        'url'  : '/apps/contacts'
                    },
                    {
                        'id'   : 'mail',
                        'title': 'Mail',
                        'type' : 'item',
                        'icon' : 'email',
                        'url'  : '/apps/mail',
                        'badge': {
                            'title': 0,
                            'bg'   : '#F44336',
                            'fg'   : '#FFFFFF'
                        }
                    },
                    {
                        'id'   : 'my-job-interviews',
                        'title': 'Job interviews',
                        'type' : 'item',
                        'icon' : 'today',
                        'url'  : '/apps/calendar',
                        'badge': {
                            'title': 2,
                            'bg'   : '#F44336',
                            'fg'   : '#FFFFFF'
                        }
                    },
                    {
                        'id'   : 'manage-job-positions',
                        'title': 'Manage Job positions',
                        'type' : 'item',
                        'icon' : 'check_box',
                        'url'  : '/apps/job'
                    },                    
                    {
                        'title': 'FAQ',
                        'type' : 'item',
                        'icon' : 'help',
                        'url'  : '/pages/faq'
                    }
                ]
            }
        ];
    }
}
