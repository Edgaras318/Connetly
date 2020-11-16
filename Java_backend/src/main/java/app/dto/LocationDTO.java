package app.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Data
@Getter
@Setter
public class LocationDTO {

    private String id;
    private String name;
    private boolean isDisabled;
}
