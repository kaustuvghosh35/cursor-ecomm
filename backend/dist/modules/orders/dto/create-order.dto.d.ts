declare class ShippingAddressDto {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phoneNumber?: string;
}
export declare class CreateOrderDto {
    shippingAddress: ShippingAddressDto;
    paymentId?: string;
}
export {};
