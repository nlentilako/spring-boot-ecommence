package com.company.smartecommerce.modules.shipping.controller;

import com.company.smartecommerce.modules.shipping.dto.ShippingRequest;
import com.company.smartecommerce.modules.shipping.dto.ShippingResponse;
import com.company.smartecommerce.modules.shipping.service.ShippingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/shipping")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ShippingController {

    private final ShippingService shippingService;

    @GetMapping
    public ResponseEntity<List<ShippingResponse>> getAllShipping() {
        List<ShippingResponse> shipping = shippingService.getAllShipping();
        return ResponseEntity.ok(shipping);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShippingResponse> getShippingById(@PathVariable Long id) {
        ShippingResponse shipping = shippingService.getShippingById(id);
        return ResponseEntity.ok(shipping);
    }

    @PostMapping
    public ResponseEntity<ShippingResponse> createShipping(@Valid @RequestBody ShippingRequest request) {
        ShippingResponse shipping = shippingService.createShipping(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(shipping);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShippingResponse> updateShipping(
            @PathVariable Long id,
            @Valid @RequestBody ShippingRequest request) {
        ShippingResponse shipping = shippingService.updateShipping(id, request);
        return ResponseEntity.ok(shipping);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShipping(@PathVariable Long id) {
        shippingService.deleteShipping(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/tracking/{trackingNumber}")
    public ResponseEntity<ShippingResponse> getShippingByTrackingNumber(@PathVariable String trackingNumber) {
        ShippingResponse shipping = shippingService.getShippingByTrackingNumber(trackingNumber);
        return ResponseEntity.ok(shipping);
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<ShippingResponse> getShippingByOrderId(@PathVariable Long orderId) {
        ShippingResponse shipping = shippingService.getShippingByOrderId(orderId);
        return ResponseEntity.ok(shipping);
    }
}