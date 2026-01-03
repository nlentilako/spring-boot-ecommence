package com.company.smartecommerce.modules.payment.dto;

import com.company.smartecommerce.common.enums.PaymentStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PaymentResponse {
    private Long id;
    private String transactionId;
    private BigDecimal amount;
    private PaymentStatus status;
    private String paymentMethod;
    private Long orderId;
    private Long userId;
    private String gatewayResponse;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}