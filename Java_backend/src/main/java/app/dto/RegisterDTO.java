package app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@NoArgsConstructor
public class RegisterDTO {

    @NotEmpty(message = "Please provide: email")
    @Email(message = "Invalid email")
    private String email;

    @NotEmpty(message = "Please provide: password")
    private String password;

    @NotEmpty(message = "Please provide: firstName")
    private String firstName;

    @NotEmpty(message = "Please provide: lastName")
    private String lastName;

    @NotEmpty(message = "Please provide: nationality")
    private String nationality;

    @NotEmpty(message = "Please provide: houseNumber")
    private String houseNumber;

    @NotEmpty(message = "Please provide: postalCode")
    private String postalCode;

    @NotEmpty(message = "Please provide: city")
    private String city;
}