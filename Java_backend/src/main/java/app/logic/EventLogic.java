package app.logic;

import app.dto.EventDTO;
import app.entities.Account;
import app.entities.Category;
import app.entities.Event;
import app.entities.Location;
import app.service.AccountService;
import app.service.CategoryService;
import app.service.EventService;
import app.service.LocationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;
import java.util.UUID;

import static org.springframework.http.ResponseEntity.ok;

@Component
public class EventLogic {

    private final LocationService locationService;
    private final EventService eventService;
    private final AccountService accountService;
    private final CategoryService categoryService;


    public EventLogic(LocationService locationService, EventService eventService, AccountService accountService, CategoryService categoryService) {
        this.locationService = locationService;
        this.eventService = eventService;
        this.accountService = accountService;
        this.categoryService = categoryService;
    }

    public ResponseEntity postEvent(@AuthenticationPrincipal Account account, @RequestBody EventDTO eventDTO) {
        Location location;
        if(eventDTO.getLocationName().isEmpty()){
            Optional<Location> optionalLocation = locationService.findByUUID(eventDTO.getLocation());
            location = optionalLocation.get();
        }
        else{
            location = this.locationService.postLocation(new Location(eventDTO.getLocationName()));
        }


        Optional<Category> category = this.categoryService.getCategory(eventDTO.getCategory());

//        if (!location.isPresent() || !category.isPresent()) {
//            return new ResponseEntity("Location or category not found", HttpStatus.NOT_FOUND);
//        }

        try{

            Event event = new Event();
            event.setName(eventDTO.getName());
            event.setCategory(category.get());
            event.setLocation(location);
            event.setDate(eventDTO.getDate());
            event.setTime(eventDTO.getTime());
            event.setDescription(eventDTO.getDescription());

            return ok(eventService.postEvent(event));
        }
        catch(Exception ex){
            return new ResponseEntity("Unexpected error: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    public ResponseEntity deleteEvent(Account account, EventDTO eventDTO) {
        Optional<Event> event = eventService.getEventById(UUID.fromString(eventDTO.getId()));

        try {
            if(!event.isPresent()){
                return new ResponseEntity("Not found", HttpStatus.NOT_FOUND);
            }
            if (event.get().getOwner().getId() == account.getId()) {
                eventService.deleteEventById(UUID.fromString(eventDTO.getId()));
                return ok("Succesfully deleted");
            }
            return new ResponseEntity("You are not the owner of this event", HttpStatus.UNAUTHORIZED);
        }
        catch(Exception ex){
            return new ResponseEntity("Unexpected error: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity joinEvent(Account account, EventDTO eventDTO) {
        Optional<Event> oEvent = eventService.getEventById(UUID.fromString(eventDTO.getId()));

        if(!oEvent.isPresent()){
            return new ResponseEntity("No event found", HttpStatus.NOT_FOUND);
        }
        try {
            account.joinEvent(oEvent.get());
            accountService.createOrUpdate(account);
            oEvent.get().joinMember(account);
            return ok(oEvent.get());
        }
        catch(Exception ex){
            return new ResponseEntity("Unexpected error: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity leaveEvent(Account account, UUID id) {
        Optional<Event> oEvent = eventService.getEventById(id);

        if(!oEvent.isPresent()){
            return new ResponseEntity("No event found", HttpStatus.NO_CONTENT);
        }
        try{
            account.leaveEvent(oEvent.get());
            accountService.createOrUpdate(account);
            oEvent.get().removeMember(account);
            return ok(oEvent.get());
        }
        catch(Exception ex){
            return new ResponseEntity(ex, HttpStatus.BAD_REQUEST);
        }
    }
}
