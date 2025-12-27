package com.nexverify.dto;

import lombok.Builder;
import lombok.Data;
import java.util.UUID;

@Data
@Builder
public class ProfileResponseDTO {
    private UUID userId;
    private String phoneNumber;
    private String email;
    private String fullName;
    private Integer walletBalance;
    private String tier;
    private String createdAt;
}