package com.company.smartecommerce.modules.shipping.domain.repository;

import com.company.smartecommerce.modules.shipping.domain.entity.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShippingRepository extends JpaRepository<Shipping, Long> {
    Optional<Shipping> findByTrackingNumber(String trackingNumber);
    Optional<Shipping> findByOrderId(Long orderId);
}