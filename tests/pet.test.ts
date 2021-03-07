import { strict as assert } from "assert";
import { PetController } from "../api/controller/pet.controller";

const pet = new PetController();

describe('User can', function () {
    it('recieve pet by his id', async function () {
        const body = await pet.getById(1)
        assert(body.id === 1, `Expected ID, but got ${body.id}`)
    })

    it('recieve pet by his status', async function(){
        let body = await pet.findByStatus('available')
        assert(body.length > 0)

        body = await pet.findByStatus('pending')
        assert(body.length > 0)

        body = await pet.findByStatus('sold')
        assert(body.length > 0)

        body = await pet.findByStatus(['available', 'pending'])
        assert(body.length > 0)
        assert(body.some((pet: any) => pet.status === 'available'))
        assert(body.some((pet: any) => pet.status === 'pending'))
        assert(!body.some((pet: any) => pet.status === 'sold'))
    })

    it('recieve pet by his tag', async function(){
        const body = await pet.findByTags('tag1')
        assert(body.length > 0)
        assert(body.every(
            (pet: any) => pet.tags.some(
                (tag: any) => tag.name === 'tag1')
                )
            )
    })
})
