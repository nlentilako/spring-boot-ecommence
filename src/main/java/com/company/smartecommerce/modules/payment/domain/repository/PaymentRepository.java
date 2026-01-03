package com.company.smartecommerce.modules.payment.domain.repository;

import com.company.smartecommerce.modules.payment.domain.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByTransactionId(String transactionId);
    
    @Query("SELECT p FROM Payment p WHERE p.orderId = :orderId")
    Optional<Payment> findByOrderId(@Param("orderId") Long orderId);
    
    List<Payment> findByUserId(Long userId);
    
    boolean existsByTransactionId(String transactionId);
}