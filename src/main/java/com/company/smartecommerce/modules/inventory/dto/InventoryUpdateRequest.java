package com.company.smartecommerce.modules.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryUpdateRequest {
    @NotNull(message = "Product ID is required")
    private Long productId;
    
    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be positive")
    private Integer quantity;
    
    private Integer reservedQuantity;
    private Integer minimumStockLevel;
    private Integer maximumStockLevel;
    private Integer reorderLevel;
    private String location;
    private String warehouseCode;
    private String batchNumber;
}