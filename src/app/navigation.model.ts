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
                        'url'  : '/apps/dashboards/project'
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
                        'url'  : '/apps/calendar'
                    },
                    {
                        'title': 'CS Contacts',
                        'type' : 'item',
                        'icon' : 'account_box',
                        'url'  : '/apps/contacts'
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
                            'bg'   : '#09d261',
                            'fg'   : '#FFFFFF'
                        }
                    },
                    {
                        'title': 'File Manager',
                        'type' : 'item',
                        'icon' : 'folder',
                        'url'  : '/apps/file-manager'
                    },
                    {
                        'title': 'To-Do',
                        'type' : 'item',
                        'icon' : 'check_box',
                        'url'  : '/apps/todo',
                        'badge': {
                            'title': 3,
                            'bg'   : '#FF6F00',
                            'fg'   : '#FFFFFF'
                        }
                    },
                    {
                        'title': 'Scrumboard',
                        'type' : 'item',
                        'icon' : 'assessment',
                        'url'  : '/apps/scrumboard'
                    }
                ]
            }
        ];
    }
}
