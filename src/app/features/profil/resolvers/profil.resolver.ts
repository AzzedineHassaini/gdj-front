import { inject } from "@angular/core";
import { IPersonDetails } from "../models/person.models";
import {ResolveFn} from "@angular/router";
import { ProfileService } from "../services/profile.service";
import { AuthService } from "../../auth/services/auth.service";

export const profilResolverFn: ResolveFn<IPersonDetails> = (route, state) => {
    const profils = inject(ProfileService);
    const authService = inject(AuthService);

    // return profils.getPersonById(authService.currentUser?.personId);
    return profils.getCurrentPerson();
}
