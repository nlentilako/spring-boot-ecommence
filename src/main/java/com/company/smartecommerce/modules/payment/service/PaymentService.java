package com.company.smartecommerce.modules.payment.service;

import com.company.smartecommerce.modules.payment.dto.PaymentRequest;
import com.company.smartecommerce.modules.payment.dto.PaymentResponse;

public interface PaymentService {
    PaymentResponse processPayment(PaymentRequest request);
    PaymentResponse refundPayment(String transactionId, Double amount, String paymentMethod);
    PaymentResponse getPaymentStatus(String transactionId);
}