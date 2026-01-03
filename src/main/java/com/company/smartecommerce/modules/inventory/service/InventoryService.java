package com.company.smartecommerce.modules.inventory.service;

import com.company.smartecommerce.modules.inventory.dto.InventoryDto;
import com.company.smartecommerce.modules.inventory.dto.InventoryUpdateRequest;

import java.util.List;

public interface InventoryService {
    InventoryDto getInventoryByProductId(Long productId);
    InventoryDto updateInventory(InventoryUpdateRequest request);
    InventoryDto adjustStock(Long productId, Integer quantityAdjustment);
    List<InventoryDto> getLowStockInventories();
    List<InventoryDto> getOutOfStockInventories();
    boolean isProductInStock(Long productId);
    Integer getAvailableQuantity(Long productId);
    void reserveStock(Long productId, Integer quantity);
    void releaseReservedStock(Long productId, Integer quantity);
    void confirmStockDeduction(Long productId, Integer quantity);
}