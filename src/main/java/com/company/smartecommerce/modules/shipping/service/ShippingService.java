package com.company.smartecommerce.modules.shipping.service;

import com.company.smartecommerce.modules.shipping.domain.entity.Shipping;
import com.company.smartecommerce.modules.shipping.dto.ShippingRequest;
import com.company.smartecommerce.modules.shipping.dto.ShippingResponse;
import com.company.smartecommerce.modules.shipping.mapper.ShippingMapper;
import com.company.smartecommerce.modules.shipping.domain.repository.ShippingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShippingService {

    private final ShippingRepository shippingRepository;
    private final ShippingMapper shippingMapper;

    public List<ShippingResponse> getAllShipping() {
        return shippingRepository.findAll().stream()
                .map(shippingMapper::toResponse)
                .collect(Collectors.toList());
    }

    public ShippingResponse getShippingById(Long id) {
        Shipping shipping = shippingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shipping not found with id: " + id));
        return shippingMapper.toResponse(shipping);
    }

    public ShippingResponse createShipping(ShippingRequest request) {
        Shipping shipping = shippingMapper.toEntity(request);
        Shipping savedShipping = shippingRepository.save(shipping);
        return shippingMapper.toResponse(savedShipping);
    }

    public ShippingResponse updateShipping(Long id, ShippingRequest request) {
        Shipping existingShipping = shippingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shipping not found with id: " + id));
        
        // Update fields
        existingShipping.setCarrier(request.getCarrier());
        existingShipping.setTrackingNumber(request.getTrackingNumber());
        existingShipping.setStatus(request.getStatus());
        existingShipping.setEstimatedDeliveryDate(request.getEstimatedDeliveryDate());
        existingShipping.setAddress(request.getAddress());
        existingShipping.setCity(request.getCity());
        existingShipping.setState(request.getState());
        existingShipping.setZipCode(request.getZipCode());
        existingShipping.setCountry(request.getCountry());

        Shipping updatedShipping = shippingRepository.save(existingShipping);
        return shippingMapper.toResponse(updatedShipping);
    }

    public void deleteShipping(Long id) {
        if (!shippingRepository.existsById(id)) {
            throw new RuntimeException("Shipping not found with id: " + id);
        }
        shippingRepository.deleteById(id);
    }

    public ShippingResponse getShippingByTrackingNumber(String trackingNumber) {
        Shipping shipping = shippingRepository.findByTrackingNumber(trackingNumber)
                .orElseThrow(() -> new RuntimeException("Shipping not found with tracking number: " + trackingNumber));
        return shippingMapper.toResponse(shipping);
    }

    public ShippingResponse getShippingByOrderId(Long orderId) {
        Shipping shipping = shippingRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Shipping not found for order id: " + orderId));
        return shippingMapper.toResponse(shipping);
    }
}