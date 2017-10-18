
export class User {
    email: string;
    password: string;
    name: string;
    surname: string;
    urlPhoto: string;
    role: string;

    constructor(user:User){
        this.email = user.email;
        this.password = user.password;
        this.name= user.name;
        this.surname = user.surname;
        this.role = user.role;
        this.urlPhoto = user.urlPhoto;

    }

    


}