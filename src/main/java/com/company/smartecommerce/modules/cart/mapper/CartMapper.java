package com.company.smartecommerce.modules.cart.mapper;

import com.company.smartecommerce.modules.cart.domain.Cart;
import com.company.smartecommerce.modules.cart.domain.CartItem;
import com.company.smartecommerce.modules.cart.dto.CartResponseDto;
import com.company.smartecommerce.modules.cart.dto.CartItemResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface CartMapper {
    CartMapper INSTANCE = Mappers.getMapper(CartMapper.class);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "items", target = "items", qualifiedByName = "mapCartItems")
    CartResponseDto toResponseDto(Cart cart);

    default List<CartItemResponseDto> mapCartItems(List<CartItem> cartItems) {
        if (cartItems == null) {
            return null;
        }
        return cartItems.stream()
                .map(this::mapCartItemToResponseDto)
                .collect(Collectors.toList());
    }

    @Mapping(source = "cart.id", target = "cartId")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    @Mapping(source = "product.image", target = "productImage")
    @Mapping(expression = "java(cartItem.getPrice().multiply(new java.math.BigDecimal(cartItem.getQuantity())))", target = "totalPrice")
    CartItemResponseDto mapCartItemToResponseDto(CartItem cartItem);

    default BigDecimal calculateTotalPrice(List<CartItem> cartItems) {
        if (cartItems == null || cartItems.isEmpty()) {
            return BigDecimal.ZERO;
        }
        return cartItems.stream()
                .map(cartItem -> cartItem.getPrice().multiply(new BigDecimal(cartItem.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}