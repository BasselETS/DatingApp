import {Injectable} from '@angular/core';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent>{


    canDeactivate(component: MemberEditComponent) {
        console.log("QWOEOASDKLWQIOJDOPJ ASJDKL ASJDL JASL DJLASJASDAJKSHD ASHDASHDP ASHDPHASUIPHDIPHASDH");
        if(component.editForm.dirty)
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost XD');

        return true;
    }
}