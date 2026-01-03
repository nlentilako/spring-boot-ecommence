package com.company.smartecommerce.modules.order.mapper;

import com.company.smartecommerce.modules.order.domain.Order;
import com.company.smartecommerce.modules.order.domain.OrderItem;
import com.company.smartecommerce.modules.order.dto.OrderResponseDto;
import com.company.smartecommerce.modules.order.dto.OrderItemResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "orderItems", target = "items", qualifiedByName = "mapOrderItems")
    OrderResponseDto toResponseDto(Order order);

    default List<OrderItemResponseDto> mapOrderItems(List<OrderItem> orderItems) {
        if (orderItems == null) {
            return null;
        }
        return orderItems.stream()
                .map(this::mapOrderItemToResponseDto)
                .collect(Collectors.toList());
    }

    @Mapping(source = "order.id", target = "orderId")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    @Mapping(source = "product.image", target = "productImage")
    OrderItemResponseDto mapOrderItemToResponseDto(OrderItem orderItem);
}