package com.nexverify.dto;

import lombok.Data;
import java.util.Map;

@Data
public class ScanRequestDTO {
    private String qrCodeId;
    private Map<String, Object> location;
    private String userId;
}