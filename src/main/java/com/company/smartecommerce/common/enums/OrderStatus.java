package com.company.smartecommerce.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderStatus {
    PENDING("PENDING"),
    CONFIRMED("CONFIRMED"),
    SHIPPED("SHIPPED"),
    DELIVERED("DELIVERED"),
    CANCELLED("CANCELLED"),
    REFUNDED("REFUNDED");

    private final String value;
}