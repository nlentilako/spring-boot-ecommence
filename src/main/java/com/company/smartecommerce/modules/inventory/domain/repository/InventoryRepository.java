package com.company.smartecommerce.modules.inventory.domain.repository;

import com.company.smartecommerce.modules.inventory.domain.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findByProductId(Long productId);
    
    @Query("SELECT i FROM Inventory i WHERE i.product.id = :productId")
    Optional<Inventory> findInventoryByProductId(@Param("productId") Long productId);
    
    @Query("SELECT i FROM Inventory i WHERE i.quantity <= i.minimumStockLevel AND i.quantity > 0")
    List<Inventory> findLowStockInventories();
    
    @Query("SELECT i FROM Inventory i WHERE i.quantity <= 0")
    List<Inventory> findOutOfStockInventories();
    
    @Query("SELECT i FROM Inventory i WHERE i.warehouseCode = :warehouseCode")
    List<Inventory> findByWarehouseCode(@Param("warehouseCode") String warehouseCode);
    
    boolean existsByProductId(Long productId);
}