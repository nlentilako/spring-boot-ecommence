package com.company.smartecommerce.modules.payment.mapper;

import com.company.smartecommerce.modules.payment.domain.entity.Payment;
import com.company.smartecommerce.modules.payment.dto.PaymentRequest;
import com.company.smartecommerce.modules.payment.dto.PaymentResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PaymentMapper {
    PaymentMapper INSTANCE = Mappers.getMapper(PaymentMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "transactionId", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "gatewayResponse", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deletedAt", ignore = true)
    Payment toEntity(PaymentRequest request);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "transactionId", source = "transactionId")
    @Mapping(target = "amount", source = "amount")
    @Mapping(target = "status", source = "status")
    @Mapping(target = "paymentMethod", source = "paymentMethod")
    @Mapping(target = "orderId", source = "orderId")
    @Mapping(target = "userId", source = "userId")
    @Mapping(target = "gatewayResponse", source = "gatewayResponse")
    @Mapping(target = "createdAt", source = "createdAt")
    @Mapping(target = "updatedAt", source = "updatedAt")
    PaymentResponse toResponse(Payment payment);
    
    @Mapping(target = "id", source = "id")
    @Mapping(target = "transactionId", source = "transactionId")
    @Mapping(target = "amount", source = "amount")
    @Mapping(target = "status", source = "status")
    @Mapping(target = "paymentMethod", source = "paymentMethod")
    @Mapping(target = "orderId", source = "orderId")
    @Mapping(target = "userId", source = "userId")
    @Mapping(target = "gatewayResponse", source = "gatewayResponse")
    @Mapping(target = "createdAt", source = "createdAt")
    @Mapping(target = "updatedAt", source = "updatedAt")
    Payment toEntityFromResponse(PaymentResponse response);
}