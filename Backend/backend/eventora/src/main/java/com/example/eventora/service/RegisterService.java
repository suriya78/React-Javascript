package com.example.eventora.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.eventora.model.HostEvent;
import com.example.eventora.model.Register;
import com.example.eventora.repository.RegisterRepo;

/*@Service
public class RegisterService {

    @Autowired
    private RegisterRepo registerRepo;

    public boolean isUserRegistered(Long eventId, Long userId) {
        return registerRepo.existsByEventIdAndUserId(eventId, userId);
    }

    public int getRegisteredCount(Long eventId) {
        return registerRepo.countByEventId(eventId);
    }

    public void registerUserForEvent(Long eventId, Long userId) {
        if (isUserRegistered(eventId, userId)) {
            throw new IllegalArgumentException("User is already registered for this event");
        }

        // Save the registration
        Register registration = new Register(eventId, userId);
        registerRepo.save(registration);
    }
}*/
@Service
public class RegisterService {

    @Autowired
    private RegisterRepo registerRepo;

    public boolean isUserRegistered(Long eventId, Long userId) {
        return registerRepo.existsByEventIdAndUserId(eventId, userId);
    }

    public int getRegisteredCount(Long eventId) {
        return registerRepo.countByEventId(eventId);
    }

    public void registerUserForEvent(Long eventId, Long userId) throws Exception {
        if (isUserRegistered(eventId, userId)) {
            throw new Exception("User is already registered for this event");
        }
        
        Register register = new Register();
        register.setEventId(eventId);
        register.setUserId(userId);
        registerRepo.save(register);
    }
}