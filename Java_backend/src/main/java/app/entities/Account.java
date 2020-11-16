package app.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name= "Account")
@Getter
@Setter
public class Account implements Serializable, UserDetails {

    @Id
    @Type(type="uuid-char")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private UUID id;

    @JsonIgnore
    @NotBlank(message = "Email cannot be blank")
    private String email;

    @JsonIgnore
    @NotBlank(message = "Password cannot be blank")
    private String password;

    @NotBlank(message = "First Name cannot be blank")
    private String firstName;

    @NotBlank(message = "First Name cannot be blank")
    private String lastName;

    @NotBlank(message = "Nationality cannot be blank")
    private String nationality;

    @NotBlank(message = "house Number cannot be blank")
    private String houseNumber;

    @NotBlank(message = "Postal Code cannot be blank")
    private String postalCode;

    @NotBlank(message = "City cannot be blank")
    private String city;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @JsonIgnore
    @ManyToMany(
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)
    @JoinTable(
            name = "account_event",
            joinColumns = { @JoinColumn(name = "account_id") },
            inverseJoinColumns = { @JoinColumn(name = "event_id") }
    )
    private Set<Event> events = new HashSet<>();

    public Account() {
    }

    @JsonIgnore     @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @JsonIgnore     @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @JsonIgnore     @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore     @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore     @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore    @Override
    public boolean isEnabled() {
        return true;
    }


    public void joinEvent(Event event){
        this.events.add(event);
    }

    public void leaveEvent(Event event){
        for(Event e : this.events){
            if(e.getId().equals(event.getId())){
                this.events.remove(e);
                return;
            }
        }
    }
}
