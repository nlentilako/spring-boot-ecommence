package com.company.smartecommerce.modules.payment.service;

import com.company.smartecommerce.modules.payment.dto.PaymentRequest;
import com.company.smartecommerce.modules.payment.dto.PaymentResponse;

public interface PaymentStrategy {
    PaymentResponse processPayment(PaymentRequest request);
    PaymentResponse processRefund(Long paymentId);
}