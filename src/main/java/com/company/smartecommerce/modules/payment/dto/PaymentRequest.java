package com.company.smartecommerce.modules.payment.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PaymentRequest {
    private BigDecimal amount;
    private String paymentMethod; // stripe, paypal, paystack, cod
    private Long orderId;
    private String currency = "USD";
}