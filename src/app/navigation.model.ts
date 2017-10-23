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
                        'type' : 'item',
                        'icon' : 'dashboard',
                        'url'  : '/apps/dashboards/project',
                        'badge': {
                            'title': 3,
                            'bg'   : '#F44336',
                            'fg'   : '#FFFFFF'
                        }
                        
                    },
                    {
                        'id'   : 'my-profile',
                        'title': 'My Profile',
                        'type' : 'item',
                        'icon' : 'web_asset',
                        'url'  : '/ui/my-profile'
                    },

                    {
                        'id'   : 'my-job-interviews',
                        'title': 'My Job interviews',
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
                        'id'   : 'cs-contracts',
                        'title': 'CS Contacts',
                        'type' : 'item',
                        'icon' : 'account_box',
                        'url'  : '/apps/contacts'
                    },
                    {
                        'id'   : 'manage-job-positions',
                        'title': 'Manage Job positions',
                        'type' : 'item',
                        'icon' : 'check_box',
                        'url'  : '/apps/todo'
                    },                    
                    {
                        'id'   : 'mail',
                        'title': 'Mail',
                        'type' : 'item',
                        'icon' : 'email',
                        'url'  : '/apps/mail',
                        'badge': {
                            'title': 25,
                            'bg'   : '#F44336',
                            'fg'   : '#FFFFFF'
                        }
                    },
                    {
                        'title': 'Faq',
                        'type' : 'item',
                        'icon' : 'help',
                        'url'  : '/pages/faq'
                    }
                ]
            }
        ];
    }
}
