import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'exceptfirstword',
    pure: false
})
export class ExceptFirstWord implements PipeTransform
{
    transform(value: string): any
    {
        let rest:string = value.replace(this.getFirstWord(value), '');
//        return value.replace(firstword, firstword.toUpperCase());
        return rest;
    }


    private getFirstWord(str) {
        let spacePosition = str.indexOf(' ');
        if (spacePosition === -1)
            return str;
        else
            return str.substr(0, spacePosition);
    };
}
