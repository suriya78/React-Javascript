package com.example.eventora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.eventora.model.HostEvent;
import com.example.eventora.service.RegisterService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "http://localhost:3000")
public class RegisterController{

    @Autowired
    private RegisterService registerService;

    @PostMapping("/check")
    public ResponseEntity<Map<String, Object>> checkRegistration(@RequestBody Map<String, Object> request) {
        System.out.println("Incoming request: " + request);
    
        String eventIdStr = request.get("eventId") != null ? request.get("eventId").toString() : null;
        String userIdStr = request.get("userId") != null ? request.get("userId").toString() : null;
    
        System.out.println("Event ID (String): " + eventIdStr);
        System.out.println("User ID (String): " + userIdStr);
    
        Long eventId = eventIdStr != null ? Long.parseLong(eventIdStr) : null;
        Long userId = userIdStr != null ? Long.parseLong(userIdStr) : null;
    
        System.out.println("Event ID: " + eventId);
        System.out.println("User ID: " + userId);
    
        boolean isRegistered = registerService.isUserRegistered(eventId, userId);
        int registeredCount = registerService.getRegisteredCount(eventId);
        return new ResponseEntity<>(Map.of("isRegistered", isRegistered, "registeredCount", registeredCount), HttpStatus.OK);
    }
    
    

    @PostMapping("/register")
    public ResponseEntity<String> registerEvent(@RequestBody Map<String, Object> request) {
        Long eventId = Long.parseLong(request.get("eventId").toString());
        Long userId = Long.parseLong(request.get("userId").toString());
        try {
            registerService.registerUserForEvent(eventId, userId);
            return new ResponseEntity<>("Registration successful", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to register: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

   

}
