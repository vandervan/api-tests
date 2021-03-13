import { URLSearchParams } from "url";
import { definitions, operations } from "../../.temp/types";
import { JsonRequestWithValidation } from "../request";
import { BaseController } from "./base.controller";

export class PetController extends BaseController {

    async getById(id: number | string) {
        return (
            await new JsonRequestWithValidation()
                .url(`http://93.126.97.71:10080/api/pet/${id}`)
                .headers({ token: this.params.token })
                .cookieJar(this.params.cookies)
                .send<operations['getPetById']['responses']['200']['schema']>()
        ).body
    }

    async findByTags(tags: string | string[]) {
        return (
            await new JsonRequestWithValidation()
                .url('http://93.126.97.71:10080/api/pet/findByTags')
                .headers({ token: this.params.token })
                .cookieJar(this.params.cookies)
                .searchParams(new URLSearchParams({tags}))
                .send<operations['findPetsByTags']['responses']['200']['schema']>()
            ).body
    }

    async findByStatus(status: string | string[]) {
        return (
            await new JsonRequestWithValidation()
                .url('http://93.126.97.71:10080/api/pet/findByStatus')
                .headers({ token: this.params.token })
                .cookieJar(this.params.cookies)
                .searchParams(new  URLSearchParams({ status }))
                .send<operations['findPetsByStatus']['responses']['200']['schema']>()
            ).body
    }

    async addNew(pet: Omit<definitions['Pet'], 'id'>) {
        return (
            await new JsonRequestWithValidation()
                .url('http://93.126.97.71:10080/api/pet')
                .method('POST')
                .body(pet)
                .headers({ token: this.params.token })
                .cookieJar(this.params.cookies)
                .send<Required<operations['addPet']['responses']['200']['schema']>>()
            ).body
    }

    async update(pet: definitions['Pet']) {
        return (
            await new JsonRequestWithValidation()
                .url('http://93.126.97.71:10080/api/pet')
                .method('PUT')
                .body(pet)
                .headers({ token: this.params.token })
                .cookieJar(this.params.cookies)
                .send<operations['updatePet']['responses']['200']['schema']>()
        ).body
    }

    async delete(id: number | string) {
        return (
            await new JsonRequestWithValidation()
                .url(`http://93.126.97.71:10080/api/pet/${id}`)
                .method('DELETE')
                .headers({ token: this.params.token })
                .cookieJar(this.params.cookies)
                .send<definitions['AbstractApiResponse']>()
            ).body
    }

}
