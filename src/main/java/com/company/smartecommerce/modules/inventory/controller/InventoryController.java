package com.company.smartecommerce.modules.inventory.controller;

import com.company.smartecommerce.common.response.ApiResponse;
import com.company.smartecommerce.modules.inventory.dto.InventoryDto;
import com.company.smartecommerce.modules.inventory.dto.InventoryUpdateRequest;
import com.company.smartecommerce.modules.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/inventories")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<InventoryDto>> getInventoryByProductId(@PathVariable Long productId) {
        InventoryDto inventory = inventoryService.getInventoryByProductId(productId);
        return ResponseEntity.ok(ApiResponse.success(inventory, "Inventory retrieved successfully"));
    }

    @PostMapping("/update")
    public ResponseEntity<ApiResponse<InventoryDto>> updateInventory(
            @Valid @RequestBody InventoryUpdateRequest request) {
        InventoryDto inventory = inventoryService.updateInventory(request);
        return ResponseEntity.ok(ApiResponse.success(inventory, "Inventory updated successfully"));
    }

    @PostMapping("/adjust-stock")
    public ResponseEntity<ApiResponse<InventoryDto>> adjustStock(
            @RequestParam Long productId,
            @RequestParam Integer quantityAdjustment) {
        InventoryDto inventory = inventoryService.adjustStock(productId, quantityAdjustment);
        return ResponseEntity.ok(ApiResponse.success(inventory, "Stock adjusted successfully"));
    }

    @GetMapping("/low-stock")
    public ResponseEntity<ApiResponse<List<InventoryDto>>> getLowStockInventories() {
        List<InventoryDto> inventories = inventoryService.getLowStockInventories();
        return ResponseEntity.ok(ApiResponse.success(inventories, "Low stock inventories retrieved successfully"));
    }

    @GetMapping("/out-of-stock")
    public ResponseEntity<ApiResponse<List<InventoryDto>>> getOutOfStockInventories() {
        List<InventoryDto> inventories = inventoryService.getOutOfStockInventories();
        return ResponseEntity.ok(ApiResponse.success(inventories, "Out of stock inventories retrieved successfully"));
    }

    @GetMapping("/product/{productId}/available-quantity")
    public ResponseEntity<ApiResponse<Integer>> getAvailableQuantity(@PathVariable Long productId) {
        Integer availableQuantity = inventoryService.getAvailableQuantity(productId);
        return ResponseEntity.ok(ApiResponse.success(availableQuantity, "Available quantity retrieved successfully"));
    }

    @PostMapping("/product/{productId}/reserve")
    public ResponseEntity<ApiResponse<Void>> reserveStock(
            @PathVariable Long productId,
            @RequestParam Integer quantity) {
        inventoryService.reserveStock(productId, quantity);
        return ResponseEntity.ok(ApiResponse.success(null, "Stock reserved successfully"));
    }

    @PostMapping("/product/{productId}/release")
    public ResponseEntity<ApiResponse<Void>> releaseReservedStock(
            @PathVariable Long productId,
            @RequestParam Integer quantity) {
        inventoryService.releaseReservedStock(productId, quantity);
        return ResponseEntity.ok(ApiResponse.success(null, "Reserved stock released successfully"));
    }

    @PostMapping("/product/{productId}/confirm-deduction")
    public ResponseEntity<ApiResponse<Void>> confirmStockDeduction(
            @PathVariable Long productId,
            @RequestParam Integer quantity) {
        inventoryService.confirmStockDeduction(productId, quantity);
        return ResponseEntity.ok(ApiResponse.success(null, "Stock deduction confirmed successfully"));
    }
}