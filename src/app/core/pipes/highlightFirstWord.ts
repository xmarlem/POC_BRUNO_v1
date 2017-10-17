import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlightfirstword',
    pure: false
})
export class HighlightFirstWord implements PipeTransform
{
    transform(value: string): any
    {
        let firstword:string = this.getFirstWord(value);
        return value.replace(firstword, firstword.toUpperCase());
    }


    private getFirstWord(str) {
        let spacePosition = str.indexOf(' ');
        if (spacePosition === -1)
            return str;
        else
            return str.substr(0, spacePosition);
    };
}
