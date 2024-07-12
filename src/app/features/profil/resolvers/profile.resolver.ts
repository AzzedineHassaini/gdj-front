import { inject } from "@angular/core";
import { IPersonDetails } from "../models/profile.models";
import {ResolveFn} from "@angular/router";
import { ProfileService } from "../services/profile.service";

export const profileResolverFn: ResolveFn<IPersonDetails> = (route, state) => {
    const profils = inject(ProfileService);

    return profils.getCurrentPerson();
}
