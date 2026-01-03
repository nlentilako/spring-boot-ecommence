package com.company.smartecommerce.common.constants;

public class SecurityConstants {
    public static final String JWT_SECRET = "smartecommercesecretkeyforjsonwebtokengenerationwithsufficientlength";
    public static final int JWT_EXPIRATION_MS = 86400000; // 24 hours
    public static final int JWT_REFRESH_EXPIRATION_MS = 604800000; // 7 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URL = "/api/v1/auth/register";
    public static final String LOGIN_URL = "/api/v1/auth/login";
    public static final String REFRESH_TOKEN_URL = "/api/v1/auth/refresh";
}