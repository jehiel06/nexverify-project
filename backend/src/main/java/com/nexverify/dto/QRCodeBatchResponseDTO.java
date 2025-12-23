package com.nexverify.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class QRCodeBatchResponseDTO {
    private String batchId;
    private Integer count;
    private List<String> qrCodeUrls;
    private String pdfDownloadUrl;
}