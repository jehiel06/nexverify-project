package com.nexverify.controller;

import com.nexverify.dto.ScanRequestDTO;
import com.nexverify.dto.ScanResponseDTO;
import com.nexverify.service.ScanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/scan")
public class ScanController {

    private final ScanService scanService;

    @GetMapping
    public String check() {
        return "Working";
    }

    @PostMapping("/verify")
    public ResponseEntity<ScanResponseDTO> verifyProduct(@Valid @RequestBody ScanRequestDTO requestDTO) {
        ScanResponseDTO responseDTO = scanService.processScan(requestDTO);
        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping("/verify/{qrCodeId}")
    public ResponseEntity<ScanResponseDTO> verifyProductById(
            @PathVariable String qrCodeId,
            @RequestParam String userId,
            @RequestBody(required = false) Map<String, Object> location) {

        ScanRequestDTO scanRequestDTO = new ScanRequestDTO();
        scanRequestDTO.setQrCodeId(qrCodeId);
        scanRequestDTO.setUserId(userId);
        scanRequestDTO.setLocation(location);

        ScanResponseDTO response = scanService.processScan(scanRequestDTO);
        return ResponseEntity.ok(response);
    }
}