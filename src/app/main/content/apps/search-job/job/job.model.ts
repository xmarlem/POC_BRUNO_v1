import { FuseUtils } from '../../../../../core/fuseUtils';
import { MatChipInputEvent } from '@angular/material';

export class Job
{
    id: string;
    name: string;
    handle: string;
    description: string;
    skills: string[];
    categories: string[];
    tags: string[];
    images: {
        default: boolean,
        id: string,
        url: string,
        type: string
    }[];
    priceTaxExcl: number;
    priceTaxIncl: number;
    taxRate: number;
    comparedPrice: number;
    quantity: number;
    sku: string;
    width: string;
    height: string;
    location: string;
    startDate: string;
    extraShippingFee: number;
    active: boolean;

    constructor(job?)
    {
        job = job || {};
        this.id = job.id || FuseUtils.generateGUID();
        this.name = job.name || '';
        this.handle = job.handle || FuseUtils.handleize(this.name);
        this.description = job.description || '';
        this.skills = job.skills || [];
        this.categories = job.categories || [];
        this.tags = job.tags || [];
        this.images = job.images || [];
        this.priceTaxExcl = job.priceTaxExcl || 0;
        this.priceTaxIncl = job.priceTaxIncl || 0;
        this.taxRate = job.taxRate || 0;
        this.comparedPrice = job.comparedPrice || 0;
        this.quantity = job.quantity || 0;
        this.sku = job.sku || 0;
        this.width = job.width || 0;
        this.height = job.height || 0;
        this.location = job.location || 0;
        this.startDate = job.startDate || 0;
        this.extraShippingFee = job.extraShippingFee || 0;
        this.active = job.active || true;
    }

    addSkill(event: MatChipInputEvent): void
    {
        const input = event.input;
        const value = event.value;

        // Add category
        if ( value )
        {
            this.skills.push(value);
        }

        // Reset the input value
        if ( input )
        {
            input.value = '';
        }
    }

    removeSkill(category)
    {
        const index = this.skills.indexOf(category);

        if ( index >= 0 )
        {
            this.skills.splice(index, 1);
        }
    }

    addTag(event: MatChipInputEvent): void
    {
        const input = event.input;
        const value = event.value;

        // Add tag
        if ( value )
        {
            this.tags.push(value);
        }

        // Reset the input value
        if ( input )
        {
            input.value = '';
        }
    }

    removeTag(tag)
    {
        const index = this.tags.indexOf(tag);

        if ( index >= 0 )
        {
            this.tags.splice(index, 1);
        }
    }
}
