export class Job
{
    id: string;
    title: string;
    notes: string;
    startDate: string;
    dueDate: boolean;
    completed: boolean;
    starred: boolean;
    important: boolean;
    deleted: boolean;
    tags: [
        {
            'id': number,
            'name': string,
            'label': string,
            'color': string
        }
        ];

    constructor(job)
    {
        {
            this.id = job.id;
            this.title = job.title;
            this.notes = job.notes;
            this.startDate = job.startDate;
            this.dueDate = job.dueDate;
            this.completed = job.completed;
            this.starred = job.starred;
            this.important = job.important;
            this.deleted = job.deleted;
            this.tags = job.tags;
        }
    }

    toggleStar()
    {
        this.starred = !this.starred;
    }

    toggleImportant()
    {
        this.important = !this.important;
    }

    toggleCompleted()
    {
        this.completed = !this.completed;
    }

    toggleDeleted()
    {
        this.deleted = !this.deleted;
    }
}
