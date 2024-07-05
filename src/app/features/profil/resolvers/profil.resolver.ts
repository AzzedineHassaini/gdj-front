import { inject } from "@angular/core";
import { IPersonDetails } from "../models/person.models";
import {ResolveFn} from "@angular/router";
import { ProfileService } from "../services/profile.service";

export const profilResolverFn: ResolveFn<IPersonDetails> = (route, state) => {
    const profils = inject(ProfileService)
    const id = 3

    return profils.getPersonById(id)
}