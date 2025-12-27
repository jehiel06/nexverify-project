package com.nexverify.dto;

import lombok.Builder;
import lombok.Data;
import java.util.UUID;

@Data
@Builder
public class AuthResponseDTO {
    private String accessToken;
    private String refreshToken;
    private UUID userId;
    private String phoneNumber;
    private boolean isNewUser;
    private String message;
}