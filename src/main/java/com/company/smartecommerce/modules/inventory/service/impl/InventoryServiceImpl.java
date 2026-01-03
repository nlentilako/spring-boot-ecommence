package com.company.smartecommerce.modules.inventory.service.impl;

import com.company.smartecommerce.modules.inventory.domain.entity.Inventory;
import com.company.smartecommerce.modules.inventory.domain.repository.InventoryRepository;
import com.company.smartecommerce.modules.inventory.dto.InventoryDto;
import com.company.smartecommerce.modules.inventory.dto.InventoryUpdateRequest;
import com.company.smartecommerce.modules.inventory.exception.InventoryException;
import com.company.smartecommerce.modules.inventory.mapper.InventoryMapper;
import com.company.smartecommerce.modules.inventory.service.InventoryService;
import com.company.smartecommerce.modules.product.domain.entity.Product;
import com.company.smartecommerce.modules.product.domain.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    private final InventoryMapper inventoryMapper;

    @Override
    @Transactional(readOnly = true)
    public InventoryDto getInventoryByProductId(Long productId) {
        log.info("Fetching inventory for product ID: {}", productId);
        
        Optional<Inventory> inventory = inventoryRepository.findByProductId(productId);
        if (inventory.isEmpty()) {
            throw new InventoryException("Inventory not found for product ID: " + productId);
        }
        
        return inventoryMapper.toDto(inventory.get());
    }

    @Override
    @Transactional
    public InventoryDto updateInventory(InventoryUpdateRequest request) {
        log.info("Updating inventory for product ID: {}", request.getProductId());
        
        // Check if product exists
        productRepository.findById(request.getProductId())
                .orElseThrow(() -> new InventoryException("Product not found with ID: " + request.getProductId()));
        
        // Find existing inventory or create new
        Inventory inventory = inventoryRepository.findByProductId(request.getProductId())
                .orElse(Inventory.builder()
                        .product(Product.builder().id(request.getProductId()).build())
                        .quantity(0)
                        .reservedQuantity(0)
                        .minimumStockLevel(5)
                        .maximumStockLevel(1000)
                        .reorderLevel(10)
                        .build());
        
        // Update inventory details
        inventory.setQuantity(request.getQuantity());
        if (request.getReservedQuantity() != null) {
            inventory.setReservedQuantity(request.getReservedQuantity());
        }
        if (request.getMinimumStockLevel() != null) {
            inventory.setMinimumStockLevel(request.getMinimumStockLevel());
        }
        if (request.getMaximumStockLevel() != null) {
            inventory.setMaximumStockLevel(request.getMaximumStockLevel());
        }
        if (request.getReorderLevel() != null) {
            inventory.setReorderLevel(request.getReorderLevel());
        }
        if (request.getLocation() != null) {
            inventory.setLocation(request.getLocation());
        }
        if (request.getWarehouseCode() != null) {
            inventory.setWarehouseCode(request.getWarehouseCode());
        }
        if (request.getBatchNumber() != null) {
            inventory.setBatchNumber(request.getBatchNumber());
        }
        
        Inventory updatedInventory = inventoryRepository.save(inventory);
        log.info("Inventory updated successfully for product ID: {}", request.getProductId());
        
        return inventoryMapper.toDto(updatedInventory);
    }

    @Override
    @Transactional
    public InventoryDto adjustStock(Long productId, Integer quantityAdjustment) {
        log.info("Adjusting stock for product ID: {} by: {}", productId, quantityAdjustment);
        
        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new InventoryException("Inventory not found for product ID: " + productId));
        
        Integer newQuantity = inventory.getQuantity() + quantityAdjustment;
        if (newQuantity < 0) {
            throw new InventoryException("Insufficient stock to adjust by: " + quantityAdjustment);
        }
        
        inventory.setQuantity(newQuantity);
        Inventory updatedInventory = inventoryRepository.save(inventory);
        
        log.info("Stock adjusted successfully for product ID: {}", productId);
        return inventoryMapper.toDto(updatedInventory);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InventoryDto> getLowStockInventories() {
        log.info("Fetching low stock inventories");
        
        List<Inventory> lowStockInventories = inventoryRepository.findLowStockInventories();
        return lowStockInventories.stream()
                .map(inventoryMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<InventoryDto> getOutOfStockInventories() {
        log.info("Fetching out of stock inventories");
        
        List<Inventory> outOfStockInventories = inventoryRepository.findOutOfStockInventories();
        return outOfStockInventories.stream()
                .map(inventoryMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isProductInStock(Long productId) {
        log.info("Checking if product is in stock: {}", productId);
        
        Optional<Inventory> inventory = inventoryRepository.findByProductId(productId);
        if (inventory.isEmpty()) {
            return false;
        }
        
        return inventory.get().getAvailableQuantity() > 0;
    }

    @Override
    @Transactional(readOnly = true)
    public Integer getAvailableQuantity(Long productId) {
        log.info("Getting available quantity for product ID: {}", productId);
        
        Optional<Inventory> inventory = inventoryRepository.findByProductId(productId);
        if (inventory.isEmpty()) {
            return 0;
        }
        
        return inventory.get().getAvailableQuantity();
    }

    @Override
    @Transactional
    public void reserveStock(Long productId, Integer quantity) {
        log.info("Reserving stock for product ID: {} quantity: {}", productId, quantity);
        
        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new InventoryException("Inventory not found for product ID: " + productId));
        
        Integer availableQuantity = inventory.getAvailableQuantity();
        if (availableQuantity < quantity) {
            throw new InventoryException("Insufficient stock available. Available: " + availableQuantity + ", Requested: " + quantity);
        }
        
        inventory.setReservedQuantity(inventory.getReservedQuantity() + quantity);
        inventoryRepository.save(inventory);
        
        log.info("Stock reserved successfully for product ID: {} quantity: {}", productId, quantity);
    }

    @Override
    @Transactional
    public void releaseReservedStock(Long productId, Integer quantity) {
        log.info("Releasing reserved stock for product ID: {} quantity: {}", productId, quantity);
        
        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new InventoryException("Inventory not found for product ID: " + productId));
        
        if (inventory.getReservedQuantity() < quantity) {
            throw new InventoryException("Insufficient reserved stock to release. Reserved: " + inventory.getReservedQuantity() + ", Requested to release: " + quantity);
        }
        
        inventory.setReservedQuantity(inventory.getReservedQuantity() - quantity);
        inventoryRepository.save(inventory);
        
        log.info("Reserved stock released successfully for product ID: {} quantity: {}", productId, quantity);
    }

    @Override
    @Transactional
    public void confirmStockDeduction(Long productId, Integer quantity) {
        log.info("Confirming stock deduction for product ID: {} quantity: {}", productId, quantity);
        
        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new InventoryException("Inventory not found for product ID: " + productId));
        
        if (inventory.getQuantity() < quantity) {
            throw new InventoryException("Insufficient stock to deduct. Current: " + inventory.getQuantity() + ", Requested to deduct: " + quantity);
        }
        
        // Deduct from total quantity and also from reserved quantity if applicable
        inventory.setQuantity(inventory.getQuantity() - quantity);
        if (inventory.getReservedQuantity() >= quantity) {
            inventory.setReservedQuantity(inventory.getReservedQuantity() - quantity);
        } else {
            // If reserved quantity is less than deduction amount, adjust accordingly
            Integer excessDeduction = quantity - inventory.getReservedQuantity();
            inventory.setReservedQuantity(0);
            inventory.setQuantity(inventory.getQuantity() - excessDeduction);
        }
        
        inventoryRepository.save(inventory);
        
        log.info("Stock deduction confirmed for product ID: {} quantity: {}", productId, quantity);
    }
}