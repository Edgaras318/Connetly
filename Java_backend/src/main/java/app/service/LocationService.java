package app.service;

import app.entities.Location;
import app.repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public Location postLocation(Location loc) { return locationRepository.save(loc); }

    public void deleteLocation(UUID id) { locationRepository.deleteById(id); }

    public List<Location> getAll() { return locationRepository.findAll(); }

    public Optional<Location> findByUUID(UUID id) { return locationRepository.findById(id); }
}
