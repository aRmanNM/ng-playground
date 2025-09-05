import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { ValidatorService } from './validator.service';

@Component({
    selector: 'app-validator',
    templateUrl: 'validator.component.html'
})

export class ValidatorComponent implements OnInit {

    form = new FormGroup({
        name: new FormControl('', {
            asyncValidators: [this.nameValidator()],
            updateOn: 'change',
        })
    });

    constructor(private validatorService: ValidatorService) { }

    ngOnInit() { }

    nameValidator(): AsyncValidatorFn {
        return async (control) => {
            let errs: any = {};

            if (!control.value)
                errs.isRequired = "true";

            if (control.value.length < 3)
                errs.minLength = 3;

            if (control.value.length > 7)
                errs.maxLength = 7;

            if (control.value.length >= 3) {
                let exists = await this.validatorService.checkNameExists(control.value).toPromise();
                if (exists == true)
                    errs.exists = "true";
            }

            const regex = new RegExp("^[A-Za-z]+$");
            if (control.value.length > 0 && !regex.test(control.value))
                errs.invalid = "true";

            control.setErrors(errs);

            return of(control.errors).toPromise();
        };
    }
}