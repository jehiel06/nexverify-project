package com.nexverify.dto;

import lombok.Data;

@Data
public class QRCodeBatchRequestDTO {
    private Integer count;
    private String clientId;
    private String productName;
}