export class NavigationModel
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'title'   : 'Applications',
                'type'    : 'group',
                'icon'    : 'apps',
                'children': [
                    {
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
                        'title': 'My Profile',
                        'type' : 'item',
                        'icon' : 'web_asset',
                        'url'  : '/ui/my-profile'
                    },

                    {
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
                        'title': 'CS Contacts',
                        'type' : 'item',
                        'icon' : 'account_box',
                        'url'  : '/apps/contacts'
                    },
                    {
                        'title': 'Manage Job positions',
                        'type' : 'item',
                        'icon' : 'check_box',
                        'url'  : '/apps/todo'
                    },                    
                    {
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
                        'title': 'Chat',
                        'type' : 'item',
                        'icon' : 'chat',
                        'url'  : '/apps/chat',
                        'badge': {
                            'title': 13,
                            'bg'   : '#FF6F00',
                            'fg'   : '#FFFFFF'
                        }
                    }
                ]
            }
        ];
    }
}
