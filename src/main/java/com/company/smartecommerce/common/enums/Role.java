package com.company.smartecommerce.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    ADMIN("ADMIN"),
    CUSTOMER("CUSTOMER"),
    SELLER("SELLER");

    private final String value;
}