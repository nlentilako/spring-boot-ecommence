package com.company.smartecommerce.modules.shipping.mapper;

import com.company.smartecommerce.modules.shipping.domain.entity.Shipping;
import com.company.smartecommerce.modules.shipping.dto.ShippingRequest;
import com.company.smartecommerce.modules.shipping.dto.ShippingResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ShippingMapper {

    ShippingMapper INSTANCE = Mappers.getMapper(ShippingMapper.class);

    @Mapping(source = "orderId", target = "order.id")
    Shipping toEntity(ShippingRequest request);

    @Mapping(source = "order.id", target = "orderId")
    ShippingResponse toResponse(Shipping shipping);
}