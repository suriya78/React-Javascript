package com.example.eventora.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.eventora.model.HostEvent;
import com.example.eventora.service.HostEventService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/host-events")
@CrossOrigin(origins = "http://localhost:3000")
public class HostEventController {

    @Autowired
    private HostEventService hostEventService;
    //host an event
    @PostMapping("/create")
    public ResponseEntity<String> createHostEvent(@RequestBody HostEvent hostEventDTO) {
        try {
            HostEvent hostEvent = new HostEvent();
    
            // Map fields from DTO to entity
            hostEvent.setEventName(hostEventDTO.getEventName());
            hostEvent.setInstitutionName(hostEventDTO.getInstitutionName());
            hostEvent.setHostProof(hostEventDTO.getHostProof());
            hostEvent.setAadhar(hostEventDTO.getAadhar());
            hostEvent.setLocation(hostEventDTO.getLocation());
            hostEvent.setEventLink(hostEventDTO.getEventLink());
            hostEvent.setDate(hostEventDTO.getDate());
            hostEvent.setDays(hostEventDTO.getDays());
            hostEvent.setStartDate(hostEventDTO.getStartDate());
            hostEvent.setEndDate(hostEventDTO.getEndDate());
            hostEvent.setStartTime(hostEventDTO.getStartTime());
            hostEvent.setEndTime(hostEventDTO.getEndTime());
            hostEvent.setHostAddress(hostEventDTO.getHostAddress());
            hostEvent.setPurpose(hostEventDTO.getPurpose());
            hostEvent.setCapacity(hostEventDTO.getCapacity());
            hostEvent.setDescription(hostEventDTO.getDescription());
            hostEvent.setContactNumber(hostEventDTO.getContactNumber());
            hostEvent.setActivities(hostEventDTO.getActivities());
            hostEvent.setEventDeadline(hostEventDTO.getEventDeadline());
            hostEvent.setEventCategory(hostEventDTO.getEventCategory());
            hostEvent.setOtherCategory(hostEventDTO.getOtherCategory());
            hostEvent.setEventImage(hostEventDTO.getEventImage());
            hostEvent.setImageDescription(hostEventDTO.getImageDescription());
            hostEvent.setStatus("Pending");  // Default status if not provided
    
            if (hostEventDTO.getEventDetails() != null) {
                hostEvent.setEventDetails(hostEventDTO.getEventDetails());
            }
    
            hostEventService.saveHostEvent(hostEvent);
    
            return new ResponseEntity<>("Event successfully created", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to create event: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    
    //show admin accepted event
    @GetMapping("/all")
    public ResponseEntity<List<HostEvent>> getAllEvents() {
        try {
            // Fetch only accepted events
            List<HostEvent> events = hostEventService.getHostEventsByStatus("Accepted");
            return new ResponseEntity<>(events, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // Print the stack trace to the console for debugging
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
}


    @GetMapping("/pending")
    public ResponseEntity<List<HostEvent>> getPendingEvents() {
        try {
            List<HostEvent> events = hostEventService.getHostEventsByStatus("Pending");
            return new ResponseEntity<>(events, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // Print the stack trace to the console for debugging
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/accept/{id}")
   public ResponseEntity<String> acceptEvent(@PathVariable Long id) {
    try {
        Optional<HostEvent> optionalEvent = hostEventService.findByEventId(id);
        if (optionalEvent.isPresent()) {
            HostEvent event = optionalEvent.get();
            event.setStatus("Accepted");
            hostEventService.saveHostEvent(event);
            return new ResponseEntity<>("Event accepted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Event not found", HttpStatus.NOT_FOUND);
        }
    } catch (Exception e) {
        e.printStackTrace(); // Print the stack trace to the console for debugging
        return new ResponseEntity<>("Failed to accept event: " + e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}


    @PostMapping("/ignore/{id}")
    public ResponseEntity<String> ignoreEvent(@PathVariable Long id) {
        try {
            Optional<HostEvent> optionalEvent = hostEventService.findByEventId(id);
            if (optionalEvent.isPresent()) {
                HostEvent event = optionalEvent.get();
                event.setStatus("Ignored");
                hostEventService.saveHostEvent(event);
                return new ResponseEntity<>("Event ignored", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Event not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace(); // Print the stack trace to the console for debugging
            return new ResponseEntity<>("Failed to ignore event: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<HostEvent>> getEventsByStatus(@PathVariable String status) {
        try {
            List<HostEvent> events = hostEventService.getHostEventsByStatus(status);
            return new ResponseEntity<>(events, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // Print the stack trace to the console for debugging
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<HostEvent> getEventById(@PathVariable Long id) {
        try {
            Optional<HostEvent> event = hostEventService.findByEventId(id);
            if (event.isPresent()) {
                return new ResponseEntity<>(event.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace(); // Print the stack trace to the console for debugging
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

  


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
        try {
            Optional<HostEvent> eventOptional = hostEventService.findByEventId(id);
            if (eventOptional.isPresent()) {
                hostEventService.deleteHostEvent(id);
                return new ResponseEntity<>("Event successfully deleted", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Event not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace(); // Print the stack trace to the console for debugging
            return new ResponseEntity<>("Failed to delete event: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Update an event by ID
    @PutMapping("/{id}")
    public ResponseEntity<String> updateEvent(@PathVariable Long id, @RequestBody HostEvent hostEventDTO) {
        try {
            Optional<HostEvent> eventOptional = hostEventService.findByEventId(id);
            if (eventOptional.isPresent()) {
                HostEvent hostEvent = eventOptional.get();

                // Update fields
                hostEvent.setEventName(hostEventDTO.getEventName());
                hostEvent.setInstitutionName(hostEventDTO.getInstitutionName());
                hostEvent.setHostProof(hostEventDTO.getHostProof());
                hostEvent.setAadhar(hostEventDTO.getAadhar());
                hostEvent.setLocation(hostEventDTO.getLocation());
                hostEvent.setEventLink(hostEventDTO.getEventLink());
                hostEvent.setDate(hostEventDTO.getDate());
                hostEvent.setDays(hostEventDTO.getDays());
                hostEvent.setStartDate(hostEventDTO.getStartDate());
                hostEvent.setEndDate(hostEventDTO.getEndDate());
                hostEvent.setStartTime(hostEventDTO.getStartTime());
                hostEvent.setEndTime(hostEventDTO.getEndTime());
                hostEvent.setHostAddress(hostEventDTO.getHostAddress());
                hostEvent.setPurpose(hostEventDTO.getPurpose());
               
                hostEvent.setCapacity(hostEventDTO.getCapacity());
                hostEvent.setDescription(hostEventDTO.getDescription());
                hostEvent.setContactNumber(hostEventDTO.getContactNumber());
                hostEvent.setActivities(hostEventDTO.getActivities());
                hostEvent.setEventDeadline(hostEventDTO.getEventDeadline());
                hostEvent.setEventCategory(hostEventDTO.getEventCategory());
                hostEvent.setOtherCategory(hostEventDTO.getOtherCategory());
                hostEvent.setEventImage(hostEventDTO.getEventImage());
                hostEvent.setImageDescription(hostEventDTO.getImageDescription());

                hostEventService.saveHostEvent(hostEvent);

                return new ResponseEntity<>("Event successfully updated", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Event not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace(); // Print the stack trace to the console for debugging
            return new ResponseEntity<>("Failed to update event: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
