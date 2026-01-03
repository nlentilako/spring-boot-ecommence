package com.company.smartecommerce.modules.payment.service.impl;

import com.company.smartecommerce.modules.payment.dto.PaymentRequest;
import com.company.smartecommerce.modules.payment.dto.PaymentResponse;
import com.company.smartecommerce.modules.payment.service.PaymentStrategy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

@Component
@Slf4j
public class CashOnDeliveryPaymentStrategy implements PaymentStrategy {

    @Override
    public String getPaymentMethod() {
        return "CASH_ON_DELIVERY";
    }

    @Override
    public PaymentResponse processPayment(PaymentRequest request) {
        log.info("Processing Cash on Delivery payment for amount: {}", request.getAmount());
        
        // For Cash on Delivery, we generate a payment reference but don't process actual payment
        String transactionId = "COD_" + UUID.randomUUID().toString().substring(0, 12).toUpperCase();
        
        PaymentResponse response = PaymentResponse.builder()
                .transactionId(transactionId)
                .paymentMethod("CASH_ON_DELIVERY")
                .amount(request.getAmount())
                .currency(request.getCurrency())
                .status("PENDING")
                .reference(request.getReference())
                .paymentDate(LocalDateTime.now())
                .gatewayResponse("Cash on Delivery payment created. Payment will be collected at delivery.")
                .build();
        
        log.info("Cash on Delivery payment created with transaction ID: {}", transactionId);
        return response;
    }

    @Override
    public PaymentResponse refundPayment(String transactionId, Double amount) {
        log.warn("Refund not applicable for Cash on Delivery payment: {}", transactionId);
        
        // Cash on Delivery doesn't support refunds since payment hasn't been collected yet
        PaymentResponse response = PaymentResponse.builder()
                .transactionId(transactionId)
                .paymentMethod("CASH_ON_DELIVERY")
                .amount(amount)
                .currency("USD")
                .status("FAILED")
                .paymentDate(LocalDateTime.now())
                .gatewayResponse("Refund not applicable for Cash on Delivery. Payment not yet collected.")
                .build();
        
        log.warn("Refund failed for Cash on Delivery transaction: {}", transactionId);
        return response;
    }
}