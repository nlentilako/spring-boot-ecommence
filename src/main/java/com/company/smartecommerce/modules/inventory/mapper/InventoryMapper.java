package com.company.smartecommerce.modules.inventory.mapper;

import com.company.smartecommerce.modules.inventory.domain.entity.Inventory;
import com.company.smartecommerce.modules.inventory.dto.InventoryDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface InventoryMapper {
    InventoryMapper INSTANCE = Mappers.getMapper(InventoryMapper.class);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "availableQuantity", expression = "java(entity.getAvailableQuantity())")
    @Mapping(target = "lowStock", expression = "java(entity.isLowStock())")
    @Mapping(target = "outOfStock", expression = "java(entity.isOutOfStock())")
    InventoryDto toDto(Inventory entity);
}