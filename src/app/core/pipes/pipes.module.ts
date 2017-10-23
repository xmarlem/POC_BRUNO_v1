import { HighlightPipe } from './highlightPipe.pipe';
import { NgModule } from '@angular/core';

import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
import { ExceptFirstWord } from './exceptFirstWord.pipe';
import { FirstWord } from './firstWord.pipe';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
    declarations: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        FirstWord, //ML
        HighlightPipe, //ML
        ExceptFirstWord, TruncatePipe

    ],
    imports     : [],
    exports     : [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        FirstWord, //ML
        HighlightPipe, //ML
        ExceptFirstWord, //ML
        TruncatePipe //ML
    ]
})

export class FusePipesModule
{

}
