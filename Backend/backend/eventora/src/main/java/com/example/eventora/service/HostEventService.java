package com.example.eventora.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.eventora.model.HostEvent;
import com.example.eventora.repository.HostEventRepo;

@Service
public class HostEventService {
    @Autowired
    private HostEventRepo hostEventRepo;

    public void saveHostEvent(HostEvent hostEvent) {
        System.out.println("Saving HostEvent: " + hostEvent); // Debugging line
        hostEventRepo.save(hostEvent);
    }
    

    public List<HostEvent> getAllHostEvents() {
        return hostEventRepo.findAll();
    }

    public void acceptEvent(HostEvent event) {
        event.setStatus("Accepted"); // Set the status to Accepted
        hostEventRepo.save(event);
    }

    public void ignoreEvent(HostEvent event) {
        hostEventRepo.delete(event);
    }

    public HostEvent findById(Long id) {
        return hostEventRepo.findById(id).orElse(null);
    }

    public Optional<HostEvent> findByEventId(Long id) {
        return hostEventRepo.findById(id);
    }

    public List<HostEvent> getHostEventsByStatus(String status) {
        return hostEventRepo.findByStatus(status);
    }
    
   
   
   
    public void deleteHostEvent(Long id) {
        hostEventRepo.deleteById(id);
    }
}
