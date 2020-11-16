package app.controllers;

import app.dto.EventDTO;
import app.entities.Account;
import app.logic.EventLogic;
import app.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/event")
public class EventController {

    private final EventLogic eventLogic;
    private final EventService eventService;

    public EventController(EventLogic eventLogic, EventService eventService) {
        this.eventLogic = eventLogic;
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity getAll(){
        return ok(eventService.getAll());
    }

    @PostMapping
    public ResponseEntity postEvent(@AuthenticationPrincipal Account account, @RequestBody EventDTO eventDto){
        return eventLogic.postEvent(account, eventDto);
    }

    @DeleteMapping
    public ResponseEntity deleteEvent(@AuthenticationPrincipal Account account, @RequestBody EventDTO eventDTO){
        return eventLogic.deleteEvent(account, eventDTO);
    }

    @PostMapping("/joinEvent")
    public ResponseEntity joinEvent(@AuthenticationPrincipal Account account, @RequestBody EventDTO eventDTO){
        return eventLogic.joinEvent(account, eventDTO);
    }

    @PostMapping("/leaveEvent")
    public ResponseEntity leaveEvent(@AuthenticationPrincipal Account account, @RequestBody EventDTO eventDTO){
        return eventLogic.leaveEvent(account, UUID.fromString(eventDTO.getId()));
    }

    @PostMapping("/singleEvent")
    public ResponseEntity getSingleEvent(@AuthenticationPrincipal Account account, @RequestBody EventDTO eventDTO){
        return ok(eventService.getEventById(UUID.fromString(eventDTO.getId())));
    }


}
