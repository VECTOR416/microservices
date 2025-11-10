import 'dotenv/config';
import { get } from 'env-var' 


export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    PRODUCT_MICROSERVICE_URL: get('PRODUCT_MICROSERVICE_URL').required().asString()
}