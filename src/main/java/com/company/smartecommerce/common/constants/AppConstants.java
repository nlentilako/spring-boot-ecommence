package com.company.smartecommerce.common.constants;

public class AppConstants {
    public static final String API_V1 = "/api/v1";
    public static final String AUTH = API_V1 + "/auth";
    public static final String USERS = API_V1 + "/users";
    public static final String PRODUCTS = API_V1 + "/products";
    public static final String CATEGORIES = API_V1 + "/categories";
    public static final String CART = API_V1 + "/cart";
    public static final String ORDERS = API_V1 + "/orders";
    public static final String PAYMENTS = API_V1 + "/payments";
    public static final String INVENTORY = API_V1 + "/inventory";
    public static final String SHIPPING = API_V1 + "/shipping";
    public static final String REVIEWS = API_V1 + "/reviews";
    public static final String RECOMMENDATIONS = API_V1 + "/recommendations";
    public static final String NOTIFICATIONS = API_V1 + "/notifications";
    public static final String ANALYTICS = API_V1 + "/analytics";
    
    public static final String DEFAULT_PAGE_NUMBER = "0";
    public static final String DEFAULT_PAGE_SIZE = "10";
    public static final String DEFAULT_SORT_BY = "id";
    public static final String DEFAULT_SORT_DIRECTION = "asc";
    
    public static final String JWT_HEADER = "Authorization";
    public static final String JWT_PREFIX = "Bearer ";
    public static final String JWT_SECRET = "smartecommercesecretkeythatshouldbeverylongandsecureforproductionuse";
    public static final long JWT_EXPIRATION = 86400000; // 24 hours
    public static final long JWT_REFRESH_EXPIRATION = 604800000; // 7 days
}