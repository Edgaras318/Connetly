package app.service;

import app.entities.Event;
import app.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event postEvent(Event event){ return this.eventRepository.save(event); }

    public List<Event> getAll() { return this.eventRepository.findAll(); }

    public Optional<Event> getEventById(UUID id) { return this.eventRepository.findById(id);
    }

    public void deleteEventById(UUID id) { this.eventRepository.deleteById(id); }


}
