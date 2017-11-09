export class Job
{
    id: string;
    title: string;
    notes: string;
    startDate: string;
    dueDate: string;
    completed: boolean;
    starred: boolean;
    important: boolean;
    deleted: boolean;
    allocationType: string;
    allocationPerc: number;
    location: string;
    skills: string[];
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
            //ML
            this.allocationType = job.allocationType;
            this.allocationPerc = job.allocationPerc;
            this.location = job.location;
            this.skills = job.skills;
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
