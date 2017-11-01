export class Todo
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
    tags: [
        {
            'id': number,
            'name': string,
            'label': string,
            'color': string
        }
        ];

    constructor(todo)
    {
        {
            this.id = todo.id;
            this.title = todo.title;
            this.notes = todo.notes;
            this.startDate = todo.startDate;
            this.dueDate = todo.dueDate;
            this.completed = todo.completed;
            this.starred = todo.starred;
            this.important = todo.important;
            this.deleted = todo.deleted;
            this.tags = todo.tags;
            //ML
            this.allocationType = todo.allocationType;
            this.allocationPerc = todo.allocationPerc;
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
