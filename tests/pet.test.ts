import { strict as assert } from "assert";
import { definitions } from "../.temp/types";
import { ApiClient } from "../api/client";


describe('Pet', function () {
    it('can be recieved by his id', async function () {
        const body = await ApiClient.unauthorized().pet.getById(1)
        assert(body.id === 1, `Expected ID, but got ${body.id}`)
    })

    it('can be recieved by his status', async function(){
        const client = ApiClient.unauthorized()
        let body = await client.pet.findByStatus('available')
        assert(body.length > 0)

        body = await client.pet.findByStatus('pending')
        assert(body.length > 0)

        body = await client.pet.findByStatus('sold')
        assert(body.length > 0)

        body = await client.pet.findByStatus(['available', 'pending'])
        assert(body.length > 0)
        assert(body.some(pet => pet.status === 'available'))
        assert(body.some(pet => pet.status === 'pending'))
        assert(!body.some(pet => pet.status === 'sold'))
    })

    it('can be recieved by his tag', async function(){
        const client = ApiClient.unauthorized()
        const body = await client.pet.findByTags('tag1')
        assert(body.length > 0)
        assert(body.every(pet => pet.tags.some(
                tag => tag.name === 'tag1')
                ), 'Every returned pet must contain tag1'
            )
    })

    it('can be added, deleted or updated', async function (){
        const adminClient = await ApiClient.loginAs({
            username: 'admin', password: 'admin'
        })
        const petToCreate: Omit<definitions['Pet'], 'id'> =  {
            category: {
                id: 0,
                name: "string"
            },
            name: "Cat",
            photoUrls: [
                "http://test.com/image.jpg"
            ],
            tags: [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            status: "available"
        }
        const addedPet = await adminClient.pet.addNew(petToCreate)
        assert.deepEqual(addedPet, {
            ...petToCreate,
            id: addedPet.id
        }, `Expected created pet to match data used upon creation`)

        const foundAddedPet = await adminClient.pet.getById(addedPet.id)
        assert.deepEqual(foundAddedPet, {
            ...petToCreate,
            id: addedPet.id
        }, `Expected found pet to match created pet`)

        const newerPet: definitions['Pet'] = {
            id: addedPet.id,
            category: {
                "id": 1,
                "name": "string2"
            },
            name: "Dog",
            photoUrls: [
                "http://test.com/image2.jpg"
            ],
            tags: [
                {
                    "id": 1,
                    "name": "string2"
                }
            ],
            status: "pending"
        }
        const updatedPet = await adminClient.pet.update(newerPet)
        assert.deepEqual(updatedPet, newerPet, `Expected updated pet to equal data used upon updating`)
        await adminClient.pet.delete(addedPet.id)
    })
})
