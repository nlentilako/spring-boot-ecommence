package com.company.smartecommerce.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProductStatus {
    ACTIVE("ACTIVE"),
    INACTIVE("INACTIVE"),
    DRAFT("DRAFT"),
    OUT_OF_STOCK("OUT_OF_STOCK");

    private final String value;
}