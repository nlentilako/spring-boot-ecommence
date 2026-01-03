package com.company.smartecommerce.modules.cart.service.impl;

import com.company.smartecommerce.exception.ResourceNotFoundException;
import com.company.smartecommerce.modules.cart.domain.Cart;
import com.company.smartecommerce.modules.cart.domain.CartItem;
import com.company.smartecommerce.modules.cart.dto.CartRequestDto;
import com.company.smartecommerce.modules.cart.dto.CartResponseDto;
import com.company.smartecommerce.modules.cart.mapper.CartMapper;
import com.company.smartecommerce.modules.cart.service.CartService;
import com.company.smartecommerce.modules.product.domain.Product;
import com.company.smartecommerce.modules.product.service.ProductService;
import com.company.smartecommerce.modules.user.domain.User;
import com.company.smartecommerce.modules.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartServiceImpl implements CartService {

    private final CartMapper cartMapper;
    private final UserService userService;
    private final ProductService productService;

    @Override
    @Transactional(readOnly = true)
    public CartResponseDto getCartByUserId(Long userId) {
        User user = userService.findById(userId);
        Cart cart = getOrCreateCart(user);
        return cartMapper.toResponseDto(cart);
    }

    @Override
    @Transactional
    public CartResponseDto addItemToCart(Long userId, CartRequestDto requestDto) {
        User user = userService.findById(userId);
        Cart cart = getOrCreateCart(user);
        Product product = productService.findById(requestDto.getProductId());

        // Check if item already exists in cart
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(requestDto.getProductId()))
                .findFirst();

        if (existingItem.isPresent()) {
            // Update quantity if item exists
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + requestDto.getQuantity());
            item.setPrice(requestDto.getPrice());
        } else {
            // Add new item
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(requestDto.getQuantity())
                    .price(requestDto.getPrice())
                    .build();
            cart.getItems().add(newItem);
        }

        return cartMapper.toResponseDto(cart);
    }

    @Override
    @Transactional
    public CartResponseDto updateItemQuantity(Long userId, Long productId, Integer quantity) {
        User user = userService.findById(userId);
        Cart cart = getCartByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user: " + userId));

        CartItem item = cart.getItems().stream()
                .filter(cartItem -> cartItem.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        if (quantity <= 0) {
            cart.getItems().remove(item);
        } else {
            item.setQuantity(quantity);
        }

        return cartMapper.toResponseDto(cart);
    }

    @Override
    @Transactional
    public void removeItemFromCart(Long userId, Long productId) {
        User user = userService.findById(userId);
        Cart cart = getCartByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user: " + userId));

        cart.getItems().removeIf(item -> item.getProduct().getId().equals(productId));
    }

    @Override
    @Transactional
    public void clearCart(Long userId) {
        User user = userService.findById(userId);
        Cart cart = getCartByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user: " + userId));

        cart.getItems().clear();
    }

    @Override
    @Transactional
    public CartResponseDto updateCart(Long userId, CartRequestDto requestDto) {
        // This method updates an existing item in the cart
        return updateItemQuantity(userId, requestDto.getProductId(), requestDto.getQuantity());
    }

    private Cart getOrCreateCart(User user) {
        Optional<Cart> existingCart = getCartByUser(user);
        if (existingCart.isPresent()) {
            return existingCart.get();
        } else {
            Cart newCart = Cart.builder()
                    .user(user)
                    .items(List.of())
                    .build();
            return newCart;
        }
    }

    private Optional<Cart> getCartByUser(User user) {
        return user.getCart() != null ? Optional.of(user.getCart()) : Optional.empty();
    }
}