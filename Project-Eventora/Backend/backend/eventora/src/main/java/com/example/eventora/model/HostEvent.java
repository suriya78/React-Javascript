package com.example.eventora.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import lombok.Data;
@Entity
@Data
public class HostEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
  
    private String eventName;
    private String institutionName;

    @Lob
    private String hostProof;

    @Lob
    private String aadhar;

    private String location;
    private String eventLink;
    private String date;
    private int days;
    private String startDate;
    private String endDate;
    private String startTime;
    private String endTime;
    private String hostAddress;
    private String purpose;

    private int capacity;
    private String description;
    private String contactNumber;
    private String activities;
    private String eventDeadline;
    private String status;

    private String eventDetails;

    @Enumerated(EnumType.STRING)
    private EventCategory eventCategory;

    private String otherCategory;

    @Lob
    private String eventImage;

    private String imageDescription;

    
}