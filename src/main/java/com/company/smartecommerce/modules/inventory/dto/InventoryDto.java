package com.company.smartecommerce.modules.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryDto {
    private Long id;
    private Long productId;
    private Integer quantity;
    private Integer reservedQuantity;
    private Integer minimumStockLevel;
    private Integer maximumStockLevel;
    private Integer reorderLevel;
    private String location;
    private String warehouseCode;
    private String batchNumber;
    private LocalDate expiryDate;
    private Integer availableQuantity;
    private boolean lowStock;
    private boolean outOfStock;
}