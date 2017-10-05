import { NgModule } from '@angular/core';

import { UIFormsModule } from './forms/forms.module';
//begin ML
import { UIMyProfileModule } from './my-profile/my-profile.module';
//end ML
import { UIIconsModule } from './icons/icons.module';
import { UITypographyModule } from './typography/typography.module';
import { UIHelperClassesModule } from './helper-classes/helper-classes.module';
import { UIPageLayoutsModule } from './page-layouts/page-layouts.module';
import { UIColorsModule } from './colors/colors.module';

@NgModule({
    imports: [
        UIFormsModule,
        UIIconsModule,
        UITypographyModule,
        UIHelperClassesModule,
        UIPageLayoutsModule,
        UIColorsModule,
        //begin ML
        UIMyProfileModule,
        //end ML
    ]
})
export class UIModule
{
}
