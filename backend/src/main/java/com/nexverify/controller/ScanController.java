package com.nexverify.controller;

import com.nexverify.dto.ScanRequestDTO;
import com.nexverify.dto.ScanResponseDTO;
import com.nexverify.service.ScanService;
import jakarta.servlet.ServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/scan")
public class ScanController {
    private final ScanService scanService;

    @PostMapping("/verify")
    public ResponseEntity<ScanResponseDTO> verifyProduct(@Valid@RequestBody ScanRequestDTO requestDTO, ServletResponse servletResponse) {
        ScanResponseDTO responseDTO = scanService.processScan(requestDTO);
        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping("/verify/{qrCodeId")
    public ResponseEntity<ScanResponseDTO> verifyProductId(@PathVariable String qrCodeId, @RequestParam String userId,
                                                           @RequestBody(required = false) Object location) {
        ScanRequestDTO scanRequestDTO = new ScanRequestDTO();
        scanRequestDTO.setQrCodeId(qrCodeId);
        scanRequestDTO.setUserId(userId);
        scanRequestDTO.setLocation((java.util.Map<String, Object>) location);

        ScanResponseDTO response = scanService.processScan(scanRequestDTO);
        return ResponseEntity.ok(response);
    }
}
