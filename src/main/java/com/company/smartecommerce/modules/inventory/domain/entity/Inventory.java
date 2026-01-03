package com.company.smartecommerce.modules.inventory.domain.entity;

import com.company.smartecommerce.common.base.BaseEntity;
import com.company.smartecommerce.modules.product.domain.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Table(name = "inventories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Inventory extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "reserved_quantity", nullable = false)
    private Integer reservedQuantity;

    @Column(name = "minimum_stock_level")
    private Integer minimumStockLevel;

    @Column(name = "maximum_stock_level")
    private Integer maximumStockLevel;

    @Column(name = "reorder_level")
    private Integer reorderLevel;

    @Column(name = "location")
    private String location;

    @Column(name = "warehouse_code")
    private String warehouseCode;

    @Column(name = "batch_number")
    private String batchNumber;

    @Column(name = "expiry_date")
    private java.time.LocalDate expiryDate;

    public Integer getAvailableQuantity() {
        return quantity - reservedQuantity;
    }

    public boolean isLowStock() {
        return getAvailableQuantity() <= minimumStockLevel;
    }

    public boolean isOutOfStock() {
        return getAvailableQuantity() <= 0;
    }
}