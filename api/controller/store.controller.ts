import {JsonRequest} from "../request";
import {operations} from "../../.temp/types";

export class StoreController {
    async getInventory() {
        return (
            await new JsonRequest()
                .url('https://93.126.97.71:10080/api/store/inventory')
                .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }
}
