package app.controllers;

import app.dto.LocationDTO;
import app.entities.Account;
import app.entities.Location;
import app.logic.LocationLogic;
import app.service.LocationService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/location")
public class LocationController {

    private final LocationLogic locationLogic;
    private final LocationService locationService;

    public LocationController(LocationLogic locationLogic, LocationService locationService) {
        this.locationLogic = locationLogic;
        this.locationService = locationService;
    }

    @GetMapping
    public ResponseEntity getAllLocations(@AuthenticationPrincipal Account account){
        return ResponseEntity.ok(locationService.getAll());
    }

    @PostMapping("/{id}")
    public ResponseEntity deleteLocation(@AuthenticationPrincipal Account account, @PathVariable String id)
    {
        try{
            if(!locationService.findByUUID(UUID.fromString(id)).isPresent()){
                return new ResponseEntity("Location not found", HttpStatus.BAD_REQUEST);
            }

            locationService.deleteLocation(UUID.fromString(id));
            return ResponseEntity.ok("Location succesfully deleted");
        }
        catch(Exception ex){
            return new ResponseEntity("Unable to delete location. Location might be used by event.", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity switchLocationDisableEnable(@AuthenticationPrincipal Account account, @RequestBody LocationDTO locationDTO){
        return locationLogic.switchLocationEnableDisable(account, locationDTO);
    }


    @PostMapping
    public ResponseEntity postLocation(@AuthenticationPrincipal Account account, @RequestBody LocationDTO locDTO){
        Location loc = new Location(locDTO.getName());
        return ResponseEntity.ok(locationService.postLocation(loc));
    }
}
