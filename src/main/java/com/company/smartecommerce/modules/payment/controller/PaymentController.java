package com.company.smartecommerce.modules.payment.controller;

import com.company.smartecommerce.common.response.ApiResponse;
import com.company.smartecommerce.modules.payment.dto.PaymentRequest;
import com.company.smartecommerce.modules.payment.dto.PaymentResponse;
import com.company.smartecommerce.modules.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/process")
    public ResponseEntity<ApiResponse<PaymentResponse>> processPayment(
            @Valid @RequestBody PaymentRequest request) {
        
        PaymentResponse response = paymentService.processPayment(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Payment processed successfully"));
    }

    @PostMapping("/refund")
    public ResponseEntity<ApiResponse<PaymentResponse>> refundPayment(
            @RequestParam String transactionId,
            @RequestParam Double amount,
            @RequestParam String paymentMethod) {
        
        PaymentResponse response = paymentService.refundPayment(transactionId, amount, paymentMethod);
        return ResponseEntity.ok(ApiResponse.success(response, "Refund processed successfully"));
    }

    @GetMapping("/{transactionId}/status")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPaymentStatus(
            @PathVariable String transactionId) {
        
        PaymentResponse response = paymentService.getPaymentStatus(transactionId);
        return ResponseEntity.ok(ApiResponse.success(response, "Payment status retrieved successfully"));
    }
}