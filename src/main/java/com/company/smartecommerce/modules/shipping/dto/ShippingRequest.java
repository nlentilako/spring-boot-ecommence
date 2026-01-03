package com.company.smartecommerce.modules.shipping.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShippingRequest {

    private Long orderId;

    private String carrier;

    private String trackingNumber;

    private String status;

    private String estimatedDeliveryDate;

    private String address;

    private String city;

    private String state;

    private String zipCode;

    private String country;
}