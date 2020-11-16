package app.logic;

import app.dto.LocationDTO;
import app.entities.Account;
import app.entities.Location;
import app.service.LocationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class LocationLogic {

    private final LocationService locationService;

    public LocationLogic(LocationService locationService) {
        this.locationService = locationService;
    }

    public ResponseEntity switchLocationEnableDisable(Account account, LocationDTO locationDTO) {
        Optional<Location> optionalLocation = locationService.findByUUID(UUID.fromString(locationDTO.getId()));
        if(!optionalLocation.isPresent()){
            return new ResponseEntity("No location found", HttpStatus.BAD_REQUEST);
        }
        try{
            Location loc = optionalLocation.get();
            loc.setDisabled(!loc.isDisabled());
            locationService.postLocation(loc);

            return ResponseEntity.ok(loc);
        }
        catch(Exception ex){
            return new ResponseEntity("Unexpected error: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }
}
