package app.dto;

import lombok.Data;

import java.sql.Date;
import java.sql.Time;
import java.util.UUID;

@Data
public class EventDTO {

    private String id;
    private String name;
    private UUID location;
    private UUID category;
    private String description;
    private Date date;
    private Time time;
    private String locationName;

}
