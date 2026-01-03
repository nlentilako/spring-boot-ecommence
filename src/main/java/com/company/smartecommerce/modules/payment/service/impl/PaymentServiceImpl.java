package com.company.smartecommerce.modules.payment.service.impl;

import com.company.smartecommerce.modules.payment.domain.entity.Payment;
import com.company.smartecommerce.modules.payment.domain.repository.PaymentRepository;
import com.company.smartecommerce.modules.payment.dto.PaymentRequest;
import com.company.smartecommerce.modules.payment.dto.PaymentResponse;
import com.company.smartecommerce.modules.payment.mapper.PaymentMapper;
import com.company.smartecommerce.modules.payment.service.PaymentService;
import com.company.smartecommerce.modules.payment.service.PaymentStrategy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {
    
    private final List<PaymentStrategy> paymentStrategies;
    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;
    
    // Map to store payment strategies by their method type for quick lookup
    private Map<String, PaymentStrategy> strategyMap;
    
    // Initialize the strategy map after all beans are created
    @javax.annotation.PostConstruct
    private void initStrategyMap() {
        this.strategyMap = paymentStrategies.stream()
                .collect(Collectors.toMap(
                    PaymentStrategy::getPaymentMethod,
                    strategy -> strategy,
                    (existing, replacement) -> existing
                ));
    }

    @Override
    @Transactional
    public PaymentResponse processPayment(PaymentRequest request) {
        log.info("Processing payment with method: {}", request.getPaymentMethod());
        
        PaymentStrategy strategy = strategyMap.get(request.getPaymentMethod().toUpperCase());
        if (strategy == null) {
            throw new IllegalArgumentException("Unsupported payment method: " + request.getPaymentMethod());
        }
        
        // Process payment through strategy
        PaymentResponse response = strategy.processPayment(request);
        
        // Save payment to database
        Payment payment = paymentMapper.toEntity(request);
        payment.setTransactionId(response.getTransactionId());
        payment.setAmount(request.getAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setCurrency(request.getCurrency());
        payment.setStatus(com.company.smartecommerce.common.enums.PaymentStatus.valueOf(response.getStatus()));
        payment.setGatewayResponse(response.getGatewayResponse());
        payment.setReference(request.getReference());
        
        Payment savedPayment = paymentRepository.save(payment);
        
        // Update response with saved payment details
        return paymentMapper.toResponse(savedPayment);
    }

    @Override
    @Transactional
    public PaymentResponse refundPayment(String transactionId, Double amount, String paymentMethod) {
        log.info("Processing refund for transaction: {} with method: {}", transactionId, paymentMethod);
        
        // First, check if payment exists
        Optional<Payment> existingPayment = paymentRepository.findByTransactionId(transactionId);
        if (existingPayment.isEmpty()) {
            throw new IllegalArgumentException("Payment not found with transaction ID: " + transactionId);
        }
        
        PaymentStrategy strategy = strategyMap.get(paymentMethod.toUpperCase());
        if (strategy == null) {
            throw new IllegalArgumentException("Unsupported payment method for refund: " + paymentMethod);
        }
        
        PaymentResponse response = strategy.refundPayment(transactionId, amount);
        
        // Update payment status in database
        Payment payment = existingPayment.get();
        payment.setStatus(com.company.smartecommerce.common.enums.PaymentStatus.REFUNDED);
        payment.setGatewayResponse(response.getGatewayResponse());
        if (response.getRefundId() != null) {
            payment.setRefundId(response.getRefundId());
        }
        
        Payment updatedPayment = paymentRepository.save(payment);
        
        return paymentMapper.toResponse(updatedPayment);
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentResponse getPaymentStatus(String transactionId) {
        log.info("Checking payment status for transaction: {}", transactionId);
        
        Optional<Payment> payment = paymentRepository.findByTransactionId(transactionId);
        if (payment.isEmpty()) {
            throw new IllegalArgumentException("Payment not found with transaction ID: " + transactionId);
        }
        
        return paymentMapper.toResponse(payment.get());
    }
}