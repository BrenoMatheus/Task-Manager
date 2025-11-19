import { ClientProxy } from '@nestjs/microservices';
export declare class AuthController {
    private readonly client;
    constructor(client: ClientProxy);
    login(body: any): Promise<import("rxjs").Observable<any>>;
    register(body: any): Promise<import("rxjs").Observable<any>>;
}
