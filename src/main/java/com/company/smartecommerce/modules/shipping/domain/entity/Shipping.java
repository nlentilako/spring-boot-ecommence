package com.company.smartecommerce.modules.shipping.domain.entity;

import com.company.smartecommerce.common.base.BaseEntity;
import com.company.smartecommerce.modules.order.domain.entity.Order;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "shipping")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Shipping extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(nullable = false)
    private String carrier;

    @Column(nullable = false)
    private String trackingNumber;

    @Column(nullable = false)
    private String status;

    @Column(name = "estimated_delivery_date")
    private String estimatedDeliveryDate;

    @Column(name = "actual_delivery_date")
    private String actualDeliveryDate;

    @Column(nullable = false)
    private String address;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "state", nullable = false)
    private String state;

    @Column(name = "zip_code", nullable = false)
    private String zipCode;

    @Column(name = "country", nullable = false)
    private String country;
}