import { definitions, operations } from "../../.temp/types";
import { JsonRequestWithValidation }  from "../request";
import { BaseController } from "./base.controller";

export class StoreController extends BaseController {

    async getOrderById(id: number | string) {
        return (await new JsonRequestWithValidation()
                .url(`http://93.126.97.71:10080/api/store/order/${id}`)
                .headers({ token: this.params.token })
                .send<operations['getOrderById']['responses']['200']['schema']>()
        )
    }

    async placeOrder(order: Omit<definitions['Order'], 'id'>) {
        return (await new JsonRequestWithValidation()
                .url('http://93.126.97.71:10080/api/store/order')
                .headers({ token: this.params.token })
                .method('POST')
                .body(order)
                .send<Required<operations['placeOrder']['responses']['200']['schema']>>()
        ).body
    }

    async getInventory() {
        return (await new JsonRequestWithValidation()
                .url('http://93.126.97.71:10080/api/store/inventory')
                .headers({ token: this.params.token })
                .cookieJar(this.params.cookies)
                .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }
}
