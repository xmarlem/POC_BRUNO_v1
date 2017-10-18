import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns';

export class CalendarFakeDb
{

    public static data = [
        {
            id  : 'events',
            data: [
                {
                    start    : subDays(startOfDay(new Date()), 1),
                    end      : addDays(new Date(), 1),
                    title    : 'Workshop for the Puzzle project.',
                    allDay   : false,
                    color    : {
                        primary  : '#ad2121',
                        secondary: '#FAE3E3'
                    },
                    resizable: {
                        beforeStart: true,
                        afterEnd   : true
                    },
                    draggable: true,
                    meta     : {
                        location: 'Zurich',
                        notes   : 'Appointment in Auditorium UH1'
                    }
                },
                {
                    start    : startOfDay(new Date()),
                    end      : startOfDay(new Date()),                    
                    title    : 'Job interview for position as "Jap developer"',
                    allDay   : false,
                    color    : {
                        primary  : '#e3bc08',
                        secondary: '#FDF1BA'
                    },
                    resizable: {
                        beforeStart: true,
                        afterEnd   : true
                    },
                    draggable: true,
                    meta     : {
                        location: 'Zurich',
                        notes   : 'Appointment in UH2 with Mr. Bruno Sonetto'
                    }
                },
                {
                    start    : subDays(endOfMonth(new Date()), 3),
                    end      : addDays(endOfMonth(new Date()), 3),
                    title    : 'Test Data Shop - Sprint 8',
                    allDay   : false,
                    color    : {
                        primary  : '#1e90ff',
                        secondary: '#D1E8FF'
                    },
                    resizable: {
                        beforeStart: true,
                        afterEnd   : true
                    },
                    draggable: true,
                    meta     : {
                        location: 'Zurich',
                        notes   : 'Current sprint of Test Data Shop'
                    }
                },
                {
                    start    : addHours(startOfDay(new Date()), 2),
                    end      : new Date(),
                    title    : 'A draggable and resizable event',
                    allDay   : false,
                    color    : {
                        primary  : '#e3bc08',
                        secondary: '#FDF1BA'
                    },
                    resizable: {
                        beforeStart: true,
                        afterEnd   : true
                    },
                    draggable: true,
                    meta     : {
                        location: 'Los Angeles',
                        notes   : 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
                    }
                }
            ]
        }
    ];
}
